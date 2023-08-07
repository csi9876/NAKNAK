import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Feed.css";

import { authorizedRequest } from "../account/AxiosInterceptor";

import FeedTag from "./FeedTag";
import { Link } from "react-router-dom";

const Feed = ({
  feedInfo,
  // followerList,
  currentFollowState,
  feedLikeState,
  userId,
  onFollowChange,
}) => {
  // props 를 여기 usestate로 받을 것인지
  // const [feedLikeState, setFeedLikeState] = useState();
  const [loading, setLoading] = useState(false);

  const followStateClass = currentFollowState
    ? "feed-following"
    : "feed-not-follow";

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    prevArrow: <></>, // 이전 화살표를 빈 컴포넌트로 지정
    nextArrow: <></>, // 다음 화살표를 빈 컴포넌트로 지정
  };

  // useEffect(() => {
  //   console.log("firststart");

  //   const checkFeedLikeState = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await authorizedRequest({
  //         method: "get",
  //         url: `api1/api/posts/my-like?page=1&size=`,
  //       });
  //       console.log("success get likedFeedList", response.data);
  //       if (
  //         response.data.data.find(
  //           (post) => post.postId === feedInfo.post.postId
  //         )
  //       ) {
  //         setFeedLikeState(true);
  //       } else {
  //         setFeedLikeState(false);
  //       }
  //     } catch (error) {
  //       console.error("failed get likedFeedList");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   checkFeedLikeState();
  // }, []);

  const followClickHandler = async () => {
    onFollowChange(currentFollowState, feedInfo.post.memberId);
    console.log("follow btn clicked", feedInfo.post.memberId);
  };

  const likeClickHandler = async () => {
    feedLikeState = !feedLikeState;
    setLoading(true);
    // console.log(feedLikeState, feedInfo.post.postId);
    try {
      await authorizedRequest({
        method: "post",
        url: `api1/api/posts/${feedLikeState ? "likes" : "unlikes"}?post=${
          feedInfo.post.postId
        }`,
      });
      // console.log("success toggle likedstate", response);
    } catch (error) {
      console.error("fail toggle likedstate");
    } finally {
      setLoading(false);
    }

    console.log("like btn clicked", feedInfo.likeCount);
  };
  // 수정해야함 ㅁ나어루머ㅏㄴㅇ뤄ㅏㅁㄴ우러ㅏㅁ눙러ㅏa
  useEffect(() => {
    const toggleLikeState = async () => {
      setLoading(true);

      // console.log(feedLikeState, feedInfo.post.postId);
      try {
        await authorizedRequest({
          method: "post",
          url: `api1/api/posts/${feedLikeState ? "likes" : "unlikes"}?post=${
            feedInfo.post.postId
          }`,
        });
        // console.log("success toggle likedstate", response);
      } catch (error) {
        console.error("fail toggle likedstate");
      } finally {
        setLoading(false);
      }
    };
    toggleLikeState();
  }, [feedLikeState]);

  return (
    <div className="feed-wrapper">
      {/* data */}
      <div>
        <h4>FeedInfo</h4>
        "postId": {feedInfo.post.postId}, <br />
        "content": {feedInfo.post.content}, <br />
        "views":{feedInfo.post.views}, <br />
        "likecnt":{feedInfo.likeCount}, <br />
        "registeredAt":{feedInfo.post.registeredAt}, <br />
        "memberId":{feedInfo.post.memberId}, <br />
        "memberImageUrl": {feedInfo.post.memberImageUrl}, <br />
        "memberNickname": {feedInfo.post.memberNickname}, <br />
        "images":
        {feedInfo.images.map((image, index) => {
          return (
            <p key={index} style={{ margin: 0 }}>
              {image.fileUrl}
            </p>
          );
        })}
        "tags":
        {feedInfo.tags.map((tag, index) => {
          return <p key={index}>{tag.name}</p>;
        })}
      </div>
      {/* data */}

      <div className="feed-board">
        <div className="feed-header">
          <img
            className="feed-profile-img"
            // null 값에 feedInfo.post.memberImageUrl가 들어가야함
            src={null || `/assets/images/jge.png`}
            alt="progile"
          />
          <Link
            to={`/Profile/${feedInfo.post.memberId}`}
            className="feed-username"
          >
            {feedInfo.post.memberNickname}
          </Link>

          {/* 팔로우 여부, 본인 게시글 일때 출력이 달라야함 */}
          {userId === feedInfo.post.memberId ? (
            <Link to={`/`} className="feed-modify">
              수정
            </Link>
          ) : (
            <div className={followStateClass} onClick={followClickHandler}>
              {currentFollowState ? "팔로잉" : "팔로우"}
            </div>
          )}
          {/* 팔로우 여부, 본인 게시글 일때 출력이 달라야함 */}
        </div>

        {/* carousel start */}

        <Slider {...settings}>
          {feedInfo.images.length > 0 ? (
            feedInfo.images.map((image, index) => (
              <div className="feed-image-container">
                <img
                  key={index}
                  className="feed-image"
                  src={"/assets/images/jge.png"}
                  alt="post images"
                />
              </div>
            ))
          ) : (
            <div className="feed-image-container">
              <img
                className="feed-image"
                src={"/assets/images/jge.png"}
                alt="post images"
              />
            </div>
          )}
          {/* dummy image */}
          {/* <div className="feed-image-container">
            <img
              // key={index}
              className="feed-image"
              src={"/assets/images/background.png"}
              alt="post images"
            />
          </div>
          <div className="feed-image-container">
            <img
              // key={index}
              className="feed-image"
              src={"/assets/123123123.png"}
              alt="post images"
            />
          </div>
          <div className="feed-image-container">
            <img
              // key={index}
              className="feed-image"
              src={"/assets/images/jge.png"}
              alt="post images"
            />
          </div> */}

          {/* dummy image end*/}
        </Slider>
        {/* carousel end */}

        <div className="feed-footer">
          <div className="feed-insight">
            <div className="feed-likes ">{feedInfo.likeCount} likes</div>
            {/* 하트가 클릭됐을때 무언가 돼야합니다 */}
            <img
              src={feedLikeState ? "/assets/icons/heart.png" : ""}
              alt="하트"
              onClick={likeClickHandler}
            />
          </div>
          <div className="feed-caption">{feedInfo.post.content}</div>
          <div className="feed-tags">
            {feedInfo.tags.map((tag, index) => {
              return <FeedTag key={index} tagInfo={tag} />;
            })}
          </div>
        </div>
        {/* 댓글 DB 아직 미완성 */}
        {/* <div className="comments">
            <div className="comment">Comment 1</div>
            <div className="comment">Comment 2</div>
          </div> */}
      </div>
    </div>
  );
};

export default Feed;
