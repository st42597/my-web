"use client";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

function Comment() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [openModalNumber, setOpenModalNumber] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const toggleModal = (i) => {
    setOpenModalNumber(i);
  };

  const handleDeletePasswordChange = (e) => {
    setDeletePassword(e.target.value);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.selected);
  };

  const handleCommentSubmit = async () => {
    if (name === "" || password === "" || comment === "") {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      const data = {
        name: name,
        password: password,
        comment: comment,
      };
      const response = await axios.post("/api/comments", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Response:", response.data);
      window.location.reload();
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const params = {
        currentPage: currentPage,
        itemsPerPage: 10,
      };
      try {
        const response = await axios
          .get("/api/comments", {
            params: params,
          })
          .then((response) => {
            // console.log("Response:", response.data);
            setTotalPage(response.data.totalPages);
            setCommentList(response.data.currentItems);
          });
        window.scrollTo(0, 0);
      } catch (error) {
        // console.error("Error:", error);
      }
    };
    fetchComments();
  }, [currentPage]);

  const handleDeleteComment = async () => {
    try {
      const response = await axios.delete(`/api/comments/${openModalNumber}`, {
        data: {
          password: deletePassword,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      window.location.reload();
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  const commentListElement = commentList.map((comment) => (
    <div className={styles.commentElementModalContainer} key={comment.id}>
      <div className={styles.commentElementContainer}>
        <p>{comment.name}</p>
        <div style={{ whiteSpace: "pre-wrap" }}>{comment.comment}</div>
        <p>{comment.created_at}</p>
        <FontAwesomeIcon
          className={styles.commentDeleteButton}
          size="lg"
          icon={faXmark}
          onClick={() => toggleModal(comment.id)}
        />
      </div>
      {openModalNumber === comment.id && (
        <div className={styles.commentModalContainer}>
          <div
            className={styles.commentModalBackground}
            onClick={() => toggleModal(null)}
          ></div>
          <div className={styles.commentModalContent}>
            <input
              type="password"
              placeholder="비밀번호"
              value={deletePassword}
              onChange={handleDeletePasswordChange}
            ></input>
            <div>
              <button onClick={handleDeleteComment}>삭제</button>
              <button onClick={() => toggleModal(null)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.commentContainer}>
      <div>
        <h1>사이트에 대한 피드백, 저에 대한 메시지 모두 환영합니다.</h1>
        <div className={styles.commentTyper}>
          <div className={styles.commentInfoContainer}>
            <input
              className={styles.commentBtlr}
              type="text"
              placeholder="이름"
              value={name}
              onChange={handleNameChange}
            ></input>
            <div className={styles.commentRowBorder}></div>
            <input
              className={styles.commentBblr}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>
          <div className={styles.commentColBorder}></div>
          <textarea
            className={styles.commentTextarea}
            type="text"
            placeholder="코멘트를 입력하세요"
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            className={`${styles.commentButton} ${styles.commentBrr}`}
            onClick={handleCommentSubmit}
          >
            입력
          </button>
        </div>
        <p className={styles.commentNoticeText}>
          * 비밀번호는 입력한 코멘트를 삭제하는데 사용됩니다.
        </p>
      </div>
      <h1>Comment</h1>
      <div className={styles.commentlistContainer}>{commentListElement}</div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={totalPage}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName={styles.paginateContainer}
        nextClassName={styles.paginateNext}
        previousClassName={styles.paginatePrevious}
        breakClassName={styles.paginateBreak}
        pageClassName={styles.pagenatePage}
        pageLinkClassName={styles.pagenatePageLink}
        activeClassName={styles.paginateActive}
        activeLinkClassName={styles.paginateActiveLink}
      />
    </div>
  );
}

export default Comment;
