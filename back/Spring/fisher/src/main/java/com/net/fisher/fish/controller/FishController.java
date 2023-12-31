package com.net.fisher.fish.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.fish.dto.BooksDto;
import com.net.fisher.fish.dto.FishBowlsDto;
import com.net.fisher.fish.dto.FishRecogDto;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.fish.entity.FishBowls;
import com.net.fisher.fish.entity.Inventory;
import com.net.fisher.fish.mapper.FishMapper;
import com.net.fisher.fish.service.FishService;
import com.net.fisher.response.BooksResponse;
import com.net.fisher.response.LocationResponse;
import com.net.fisher.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FishController {

    private final JwtTokenizer jwtTokenizer;
    private final FishMapper fishMapper;
    private final FishService fishService;

    double LIGHTER_SIZE = 8.00;

    /*@PostMapping("/fishes/upload")
    public ResponseEntity<InventoryDto.SingleResponse> postFishImage(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam("image") MultipartFile image){
        FishRecogDto recogDto = fishService.recognizeFish(token,image);
        return postInventory(token,new InventoryDto.Post(recogDto.getCode(), recogDto.getSize()));
    }*/

    // 물고기 인식 모듈에서 인벤토리에 추가하는 로직
    @PostMapping("/fishes/catch")
    public ResponseEntity<InventoryDto.SingleResponse> postInventory(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody InventoryDto.Post requestBody){

        long tokenId = jwtTokenizer.getMemberId(token);

        String fishName = requestBody.getLabel();

        requestBody.setSize(requestBody.getSize()*LIGHTER_SIZE);

        LocationResponse locationResponse = requestBody.getLocation();

        Inventory inventory = fishService.catchFish(tokenId,fishName, fishMapper.toInventory(requestBody),locationResponse);

        return new ResponseEntity<>(fishMapper.toInventorySingleResponse(inventory), HttpStatus.CREATED);
    }


    @PostMapping("/fishes/intobowl")
    public ResponseEntity<FishBowlsDto.SingleResponse> postToFishBowls(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody FishBowlsDto.Post requestBody){

        long tokenId = jwtTokenizer.getMemberId(token);

        long inventoryId = requestBody.getTargetId();

        FishBowls fishBowls = fishService.intoFishBowls(tokenId,inventoryId);

        return new ResponseEntity<>(fishMapper.toFishBowlResponse(fishBowls),HttpStatus.OK);
    }

    @PostMapping("/fishes/intoinven")
    public ResponseEntity<InventoryDto.SingleResponse> postToInventory(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody FishBowlsDto.Post requestBody) {
        long tokenId = jwtTokenizer.getMemberId(token);

        long fishBowlId = requestBody.getTargetId();

        Inventory inventory = fishService.intoInventory(tokenId, fishBowlId);
        return new ResponseEntity<>(fishMapper.toInventorySingleResponse(inventory),HttpStatus.OK);
    }

    @GetMapping("/books/{member-id}")
    public ResponseEntity<BooksResponse> getBooksOfMember(@PathVariable(value = "member-id") long memberId){

        List<BooksDto.Response> booksResponseDtos = fishMapper.toBooksResponseDtos(fishService.readBooksOfMember(memberId));

        BooksResponse responses = new BooksResponse(booksResponseDtos,fishService.checkCaughtFish(memberId));

        // DB에 딕셔너리가 id 순으로 차곡차곡 쌓여있을텐데 과연 이렇게 처리해야할까?
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }

    @GetMapping("/fishes/fishbowl/view")
    public ResponseEntity<List<FishBowlsDto.MultiResponse>>
    getFishBowlsListOfMember(
            @RequestHeader(name = "Authorization") String token){
        long tokenId = jwtTokenizer.getMemberId(token);

        List<FishBowls> fishBowls= fishService.getFishBowlsListFromMemberId(tokenId);
        return new ResponseEntity<>(fishMapper.toFishBowlMultiResponseDtos(fishBowls),HttpStatus.OK);
    }

    @GetMapping("/fishes/inventory/view")
    public ResponseEntity<PageResponse<InventoryDto.MultiResponse>>
    getInventoryListOfMember(
            @RequestHeader(name = "Authorization") String token,
            @PageableDefault(size = 20, sort= "inventoryId",direction = Sort.Direction.DESC) Pageable pageable){

        long tokenId = jwtTokenizer.getMemberId(token);

        Page<Inventory> inventoryPage = fishService.getInventoryListFromMemberId(tokenId,pageable);

        PageResponse<InventoryDto.MultiResponse> response = new PageResponse<>
                (inventoryPage.getTotalElements(),
                        fishMapper.toInventoryMultiResponseDtos(inventoryPage.getContent()));

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/fishes/inventory/delete")
    public ResponseEntity<HttpStatus> deleteInventory(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody InventoryDto.Delete requestBody) {

        long tokenId = jwtTokenizer.getMemberId(token);

        fishService.deleteInventoryItem(tokenId, requestBody.getInventoryId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/fishes/inventory/info/{member-id}")
    public ResponseEntity<InventoryDto.Info> getInventoryInfo(@PathVariable("member-id")long memberId){
        return new ResponseEntity<>(fishService.getInventoryInfoFromMemberId(memberId),HttpStatus.OK);
    }

    /*------------------------관리용 API-----------------------*/


}
