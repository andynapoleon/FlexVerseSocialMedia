import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user); // we can get the user because the user has to be alreayd logged in when they're at HomePage

  return (
    <Box>
      <Navbar />
      <Box // this is basically the whole big SCREEN BOX that contains all the widgets
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"} // desktop - widgets lying on a row | mobile - widgets on top of each other
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={_id}
            picturePath={
              picturePath
            } /* we pass in the props for UserWidget too */
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined} // this specifies the length of this flexible box
          mt={isNonMobileScreens ? undefined : "2rem"} // margin top for mobile because the widget will be stacked on each other - this is kindal
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
