import { User } from "./user.model";
import { genericControllers } from "../crud.controllers";

const createUser = async (req, res, next) => {
  const { email, username, name, password } = req.body;
  const UN_TAG = "p/";

  const removeUsernameTag = (username) => {
    const UN_TAG = "p/";
    const trimmedUN = username.trim();
    if (trimmedUN.toLowerCase()[1] === UN_TAG) return trimmedUN.substring(2);
    return trimmedUN;
  };

  try {
    const alreadyEmail = await User.findOne({ email: email.toLowerCase() });
    if (alreadyEmail) {
      return res
        .status(401)
        .json({ msg: "Email already in use, try logging in." });
    }

    const alreadyUsername = await User.findOne({
      username: removeUsernameTag(username).toLowerCase(),
    });
    if (alreadyUsername) {
      return res
        .status(401)
        .json({ msg: "Username already in use, try another one." });
    }

    const user = await User.create({ email, username, name, password });

    res.json({
      email: user.email,
      username: UN_TAG + user.username,
      name: user.name,
    });
  } catch (err) {
    return next(err);
  }
};

export default { ...genericControllers(User), createUser };
