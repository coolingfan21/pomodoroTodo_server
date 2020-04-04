import { prisma } from "../../../generated/prisma-client";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();
const HASHSECRET = process.env.HASHSECRET;

export default {
  Mutation: {
    createUser: async (_, args) => {
      const { email, password, nickName, birth } = args;

      const hash = crypto.createHmac("sha256", HASHSECRET);
      hash.update(password);
      const output = hash.digest("hex");

      try {
        await prisma.createUser({
          email,
          password: output,
          nickName,
          birth
        });
        return true;
      } catch (error) {
        console.log("Cannot create user : ", error);
        return false;
      }
    }
  }
};
