import {
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null); // grab user from the back-end and save it from our use
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token); // grab the token from the store
  const dark = palette.neutral.dark; // grab some colors from the theme
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // call to the API (back-end) to get user info
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      // getting userId
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }, // back-end needs the "Bearer" before the token for authorizing the user
    });
    const data = await response.json(); // get the response (as JSON object) - and this contains User object from back-end
    setUser(data); // set User because data is literally just a User object - so set it to the state
  };

  // side effect of this widget - grab and display user's information
  // we only want the side effect to happen once on the 1st render, so we pass in an empty array in the 2nd argument
  // EVERY TIME THE STATE CHANGES, THE PAGE RENDERS
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null; // make sure that it is not going to error out
  }

  const { firstName, lastName, location, occupation, friends, split, goal } =
    user; // destructure items from User

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <IconButton>
          <EditOutlined />
        </IconButton>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          My Fitness Information
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <FitnessCenterIcon />
            <Box>
              <Typography color={medium} fontWeight="500">
                Current Split
              </Typography>
              <Typography color={main} fontWeight="500">
                {split}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <SportsScoreIcon />
            <Box>
              <Typography color={medium} fontWeight="500">
                Fitness Goal
              </Typography>
              <Typography color={main} fontWeight="500">
                {goal}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
