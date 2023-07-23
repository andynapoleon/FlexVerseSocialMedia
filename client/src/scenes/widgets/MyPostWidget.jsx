import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  // React Component
  const dispatch = useDispatch();

  // IMAGE STATE
  const [isImage, setIsImage] = useState(false); // switch - has someone opened the image portal to drop an image?
  const [image, setImage] = useState(null); // state to control the image: is it an image or not?
  // CLIP STATE
  const [isClip, setIsClip] = useState(false); // switch - has someone opened the image portal to drop an image?
  const [clip, setClip] = useState(null); // state to control the image: is it an image or not?
  // ATTACHMENT STATE
  const [isAt, setIsAt] = useState(false); // switch - has someone opened the image portal to drop an image?
  const [at, setAt] = useState(null); // state to control the image: is it an image or not?

  const [post, setPost] = useState(""); // post content (description)
  const { palette } = useTheme(); // grab the color
  const { _id } = useSelector((state) => state.user); // get user id
  const token = useSelector((state) => state.token); // get user token
  //const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)} // event.target.value => give it to the post
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {/* IMAGE CONTROL */}
      {isImage && ( // if isImage is false, meaning there's no image inside yet, then we'll have a box right here
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])} // set image's state to whatever the user put in
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && ( // trash icon to remove image
                  <IconButton
                    onClick={() => setImage(null)} // remove image so just remove it
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* CLIP CONTROL */}
      {isClip && ( // if isImage is false, meaning there's no image inside yet, then we'll have a box right here
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setClip(acceptedFiles[0])} // set image's state to whatever the user put in
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!clip ? (
                    <p>Add Clip Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{clip.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {clip && ( // trash icon to remove image
                  <IconButton
                    onClick={() => setClip(null)} // remove image so just remove it
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* ATTACHMENT CONTROL */}
      {isAt && ( // if isImage is false, meaning there's no image inside yet, then we'll have a box right here
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setAt(acceptedFiles[0])} // set image's state to whatever the user put in
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!at ? (
                    <p>Add Attachment Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{at.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {at && ( // trash icon to remove image
                  <IconButton
                    onClick={() => setAt(null)} // remove image so just remove it
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        <FlexBetween gap="0.25rem" onClick={() => setIsClip(!isClip)}>
          <GifBoxOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Clip</Typography>
        </FlexBetween>

        <FlexBetween gap="0.25rem" onClick={() => setIsAt(!isAt)}>
          <AttachFileOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Attachment</Typography>
        </FlexBetween>

        <Button
          disabled={!post} // if the post is not "" (so user has typed in content already)
          onClick={handlePost} // handle posting
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
