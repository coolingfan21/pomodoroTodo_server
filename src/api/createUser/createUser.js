import { prisma } from "../../../generated/prisma-client";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();
const HASHSECRET = process.env.HASHSECRET;

export default {
  Mutation: {
    createUser: async (_, args) => {
      const { email, password, nickName, birth, googleId } = args;

      let output;
      if (password) {
        const hash = crypto.createHmac("sha256", HASHSECRET);
        hash.update(password);
        output = hash.digest("hex");
      }

      try {
        await prisma.createUser({
          email,
          password: output ? output : "",
          nickName,
          birth,
          googleId: googleId ? googleId : ""
        });
        return true;
      } catch (error) {
        console.log("Cannot create user : ", error);
        return false;
      }
    }
  }
};
