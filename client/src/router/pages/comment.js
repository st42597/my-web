import "./comment.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Comment() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [openModalNumber, setOpenModalNumber] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [clikedComment, setClikedComment] = useState(null);

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
      console.log("Response:", response.data);
      window.location.reload();
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  useEffect(() => {
    axios.get("/api/comments").then((response) => {
      console.log("Response:", response.data);
      setCommentList(response.data);
    });
  }, []);

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
    <div className="comment-element-modal-container">
      <div className="comment-element-container" key={comment.id}>
        <p>{comment.name}</p>
        <p>{comment.comment}</p>
        <p>{comment.created_at}</p>
        <FontAwesomeIcon
          className="comment-delete-button"
          size="lg"
          icon={faXmark}
          onClick={() => toggleModal(comment.id)}
        />
      </div>
      {openModalNumber === comment.id && (
        <div className="comment-modal-container">
          <div
            className="comment-modal-background"
            onClick={() => toggleModal(null)}
          ></div>
          <div className="comment-modal-content">
            <input
              type="password"
              placeholder="비밀번호"
              value={deletePassword}
              onChange={handleDeletePasswordChange}
            ></input>
            <button onClick={handleDeleteComment}>삭제</button>
            <button onClick={() => toggleModal(null)}>취소</button>
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <div className="comment-continer">
      <div>
        <h1>사이트에 대한 피드백, 저에 대한 메시지 모두 환영합니다.</h1>
        <div className="comment-typer">
          <div className="comment-info-container">
            <input
              className="comment-btlr"
              type="text"
              placeholder="이름"
              value={name}
              onChange={handleNameChange}
            ></input>
            <div className="comment-row-border"></div>
            <input
              className="comment-bblr"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>
          <div className="comment-col-border"></div>
          <textarea
            className="comment-textarea"
            type="text"
            placeholder="코멘트를 입력하세요"
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            className="comment-button comment-brr"
            onClick={handleCommentSubmit}
          >
            입력
          </button>
        </div>
        <p className="comment-notice-text">
          * 비밀번호는 입력한 코멘트를 삭제하는데 사용됩니다.
        </p>
      </div>
      <h1>Comment</h1>
      <div className="commentlist-container">{commentListElement}</div>
    </div>
  );
}

export default Comment;
