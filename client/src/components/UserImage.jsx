import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size} /* default size and width */>
      <img
        style={{
          objectFit: "cover",
          borderRadius: "50%" /* this is for circle */,
        }} // cover the entire space but crop the size if it needs to fit the dimension (good for centering)
        width={size}
        height={size}
        alt="user"
        src={process.env.REACT_APP_BASE_URL + `/assets/${image}`} // get it from the back-end - image is passed in as a prop
      />
    </Box>
  );
};

export default UserImage;
