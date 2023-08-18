package com.net.fisher.fish.repository;

import com.net.fisher.fish.entity.Books;
import com.net.fisher.fish.entity.Fish;
import com.net.fisher.member.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Book;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BooksRepository extends JpaRepository<Books,Long> {
    Books findByFishAndMember(Fish fish, Member member);

    @Query(value = "SELECT c FROM books c JOIN FETCH c.fish WHERE c.member.memberId = :memberId")
    List<Books> findBooksByMemberId(long memberId);

    @Query(value = "UPDATE books c SET c.maxSize = CASE WHEN :newSize > c.maxSize THEN :newSize ELSE c.maxSize END," +
            "c.number = c.number+1, c.getDate = :nowTime WHERE c = :book")
    @Modifying
    @Transactional
    void updateBooksFromValues(double newSize, LocalDateTime nowTime, Books book);

}

