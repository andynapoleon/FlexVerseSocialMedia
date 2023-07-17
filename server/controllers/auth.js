import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  // asynchronous function because we're making calls to Mongoose database (like from front-end to any remote API)
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body; // obtain the registered info from the front-end (req.body)

    // Password salting and hashing
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // store the password hash rather than the password (security)
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // just a random number to simply the program
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // 201: something has been created - return the response to front-end (savedUser - json format) for further use
  } catch (err) {
    res.status(500).json({ error: err.message }); // 500: error - return the response to front-end
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // creating the token to send to the front-end, the client will send this along in the next requests so the server knows that they're trustworthy (authorization)
    delete user.password; // delete the password so it's not sent to the front-end (delete from the User object)
    res.status(200).json({ token, user }); // send the token and the user object to the front-end as a JSON OBJECTs
  } catch (err) {
    res.status(500).json({ error: err.message }); // send error message
  }
};
