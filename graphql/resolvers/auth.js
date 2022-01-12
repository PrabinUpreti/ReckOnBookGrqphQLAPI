import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/users.js";

const authResolver = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("User Exist Already");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: null,
        _id: result._doc._id.toString(),
      };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User doesn't exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign(
      { userId: user.td, email: user.email },
      "somesupersecretkey",
      {
        expiresIn: "1h",
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
};
export default authResolver;
