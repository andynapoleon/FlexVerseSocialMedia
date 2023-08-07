import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik"; // form library
import * as yup from "yup"; // validation library
import { useNavigate } from "react-router-dom"; // navigate when they finish register (to login)
import { useSelector, useDispatch } from "react-redux"; // store user information - update state
import { setUser } from "state"; // redux - user will login

// validation for registration
const updateSchema = yup.object().shape({
  // a registration form object from Yup! - every field is required!
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  split: yup.string().required("required"),
  goal: yup.string().required("required"),
});

// set up the initial values for the form
const initialValuesUpdate = {
  firstName: "",
  lastName: "",
  location: "",
  occupation: "",
  split: "",
  goal: "",
};

// this is the React Form Component being set up
const Form = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const update = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      process.env.REACT_APP_BASE_URL + `/users/${_id}/updateProfile`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // send it to the back-end
      }
    );

    const savedUser = await savedUserResponse.json(); // waiting for the response from the back-end
    onSubmitProps.resetForm(); // onSubmitProps has some functions from Formik that we can use - resetForm() is one of them!

    if (savedUser) {
      dispatch(
        setUser({
          user: savedUser, // pass a JSON object like this to setLogin to get action payload - just a toolkit of Redux
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // the parameters
    await update(values, onSubmitProps);
    // console.log("hihi");
  };

  return (
    <Formik // formik basically has all of the handlers for us to use for our form!
      onSubmit={handleFormSubmit} // handle form submission (above)
      initialValues={initialValuesUpdate} // pass in initial values
      validationSchema={updateSchema} // pass in schemas (created from Yup above)
    >
      {({
        values, // the values passed in of login or register objects
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit, // this gets the handleFormSubmit function above - this will be triggered on click below
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" // split the grid into 4 cols
            sx={{
              // this means any div that are children classes of this Box component
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, // on mobile on span 4, on normal just 2 for each textfield - two textfields per row!
            }}
          >
            <>
              <TextField // input
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={
                  Boolean(touched.firstName) && Boolean(errors.firstName) // has been touched AND error in this particular field
                }
                helperText={touched.firstName && errors.firstName} // show the error if not will show if it as been touched or not
                sx={{ gridColumn: "span 2" }} // span of 2, max is 4, so 2 text fields per row
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Current Workout Split"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.split}
                name="split"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Fitness Goal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.goal}
                name="goal"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
              />
            </>
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              UPDATE PROFILE
            </Button>
            <Typography
              onClick={() => {
                navigate("/home");
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              Cancel
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
