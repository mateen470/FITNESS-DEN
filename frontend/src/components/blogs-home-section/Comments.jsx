import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from "@mui/icons-material/Send";

const Comments = ({ id }) => {
  const [comment, setComment] = useState("");
  const userId = useSelector((state) => state.CurrentUser.CurrentUserID);
  const { isUser } = useSelector((state) => state.CheckForUserType);

  const PostComment = async () => {
    try {
      const postCommentResponse = await axios.post(`blog/add-comment/${id}`, {
        userId,
        comment,
      });

      if (postCommentResponse.data && postCommentResponse.data.success) {
        setComment("");
      }

      if (
        postCommentResponse.response &&
        postCommentResponse.response.data &&
        postCommentResponse.response.data.message
      ) {
        toast.error(postCommentResponse.response.data.message);
        setComment("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const notAccessible = () => {
    toast.error("LOGIN FIRST!!");
  };

  return (
    <Box>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
          px: 5,
          mx: 2,
        }}
      >
        <input
          type="text"
          placeholder="Add Comment..."
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
        {isUser ? (
          <Button
            sx={{
              backghround: "none",
              border: "none",
              outline: "none",
              color: "white",
            }}
            onClick={PostComment}
          >
            <SendIcon />
          </Button>
        ) : (
          <Button
            sx={{
              backghround: "none",
              border: "none",
              outline: "none",
              color: "white",
            }}
            onClick={notAccessible}
          >
            <SendIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Comments;
