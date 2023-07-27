import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState(""); // comment content
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]); // check if user has liked the post or not
  const likeCount = Object.keys(likes).length; // count the # of keys in the likes json object
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // console.log("friendId:", postUserId);
  // console.log("name:", name);
  // console.log("_id:", loggedInUserId);
  // console.log("friends:", friends);

  // update likes from the back-end
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // update comments from the back-end
  const handleComment = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
  };

  // delete a post from the back-end
  const deletePost = async () => {
    await fetch(`http://localhost:3001/posts/${postId}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    navigate(0);
  };

  const handleFileType = function (picturePath) {
    if (picturePath) {
      if (
        picturePath.includes(".jpg") ||
        picturePath.includes(".jpeg") ||
        picturePath.includes(".png") ||
        picturePath.includes(".JPG")
      ) {
        return (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        );
      } else if (picturePath.includes(".mp4")) {
        return (
          <video
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            controls
          >
            <source
              src={`http://localhost:3001/assets/${picturePath}`}
              type="video/mp4"
            ></source>
          </video>
        );
      } else if (picturePath.includes(".pdf")) {
        return (
          <a
            style={{ color: primary }}
            href={`http://localhost:3001/assets/${picturePath}`}
          >
            {picturePath}
          </a>
        );
      }
    }
    return null;
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {handleFileType(picturePath)}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* LIKES */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* COMMENTS BUTTON */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* DELETE POST BUTTON */}
        {loggedInUserId === postUserId && (
          <IconButton aria-label="delete" size="small" onClick={deletePost}>
            <ClearIcon fontSize="inherit" />
          </IconButton>
        )}

        {/* COMMENTS section */}
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
          <FlexBetween>
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => setComment(e.target.value)} // event.target.value => give it to the post
              value={comment}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1rem",
                mt: "1rem",
                mb: "0.25rem",
                padding: "0.25rem 1rem 0.25rem 1rem",
              }}
            />
            <Button
              disabled={!comment} // if the comment is not "" (so user has typed in content already)
              onClick={handleComment} // handle commenting
              sx={{
                mt: "0.75rem",
              }}
            >
              <SendIcon />
            </Button>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
