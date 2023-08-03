import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import TableViewIcon from "@mui/icons-material/TableView";
import { useMediaQuery } from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { columns, rows } from "data.js";
import WorkoutTemplate from "components/WorkoutTemplate";

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
  // TEMPLATE STATE
  const [isTemplate, setIsTemplate] = useState(false); // switch - has someone opened the image portal to drop an image?
  const [template, setTemplate] = useState(null); // state to control the image: is it an image or not?

  const [post, setPost] = useState(""); // post content (description)
  const { palette } = useTheme(); // grab the color
  const { _id } = useSelector((state) => state.user); // get user id
  const token = useSelector((state) => state.token); // get user token
  const isNonMobileScreens = useMediaQuery("(min-width: 550px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    } else if (clip) {
      formData.append("picture", clip);
      formData.append("picturePath", clip.name);
    } else if (at) {
      formData.append("picture", at);
      formData.append("picturePath", at.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setClip(null);
    setAt(null);
    setPost("");
  };

  function handleDropzone(
    firstDrop,
    setFirstDrop,
    setSecondDrop,
    setThirdDrop,
    setFourthDrop
  ) {
    setFirstDrop(!firstDrop);
    setSecondDrop(false);
    setThirdDrop(false);
    setFourthDrop(false);
  }

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
            acceptedFiles="jpeg,png,jpg,JPG"
            multiple={false}
            onDropAccepted={(acceptedFiles) => setImage(acceptedFiles[0])} // set image's state to whatever the user put in
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
                    <p>Add Image Here (.jpg, .jpeg, .png)</p>
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
            acceptedFiles=".mp4"
            multiple={false}
            onDropAccepted={(acceptedFiles) => setClip(acceptedFiles[0])} // set image's state to whatever the user put in
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
                    <p>Add Clip Here (.mp4)</p>
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
            acceptedFiles=".pdf"
            multiple={false}
            onDropAccepted={(acceptedFiles) => setAt(acceptedFiles[0])} // set image's state to whatever the user put in
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
                    <p>Add Attachment Here (.pdf)</p>
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

      {/* Template CONTROL */}
      {isTemplate && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* <DataGrid
            editMode="row"
            rows={rows}
            columns={columns}
            sx={{ minWidth: 500 }}
          /> */}
          <WorkoutTemplate />
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          onClick={() =>
            handleDropzone(
              isImage,
              setIsImage,
              setIsClip,
              setIsAt,
              setIsTemplate
            )
          }
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          {isNonMobileScreens && (
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          )}
        </FlexBetween>

        <FlexBetween
          gap="0.25rem"
          onClick={() =>
            handleDropzone(
              isClip,
              setIsClip,
              setIsImage,
              setIsAt,
              setIsTemplate
            )
          }
        >
          <VideoLibraryIcon sx={{ color: mediumMain }} />
          {isNonMobileScreens && (
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Clip
            </Typography>
          )}
        </FlexBetween>

        <FlexBetween
          gap="0.25rem"
          onClick={() =>
            handleDropzone(isAt, setIsAt, setIsImage, setIsClip, setIsTemplate)
          }
        >
          <AttachFileOutlined sx={{ color: mediumMain }} />
          {isNonMobileScreens && (
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Attachment
            </Typography>
          )}
        </FlexBetween>

        <FlexBetween
          gap="0.25rem"
          onClick={() =>
            handleDropzone(
              isTemplate,
              setIsTemplate,
              setIsImage,
              setIsClip,
              setIsAt
            )
          }
        >
          <TableViewIcon sx={{ color: mediumMain }} />
          {isNonMobileScreens && (
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Workout Template
            </Typography>
          )}
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
