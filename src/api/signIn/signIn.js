import { prisma } from "../../../generated/prisma-client";
import { generateToken } from "../../utils";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const HASHSECRET = process.env.HASHSECRET;

export default {
  Mutation: {
    signIn: async (_, args) => {
      const { email, password } = args;

      // 해시 생성
      const hash = crypto.createHash("sha256", HASHSECRET);
      hash.update(password);
      const output = hash.digest("hex");
      //저장된 유저 정보 가져오기
      try {
        const user = await prisma.user({ email });
        // 해슁 비교하기
        if (user.password === output) {
          return JSON.stringify({ token: generateToken(user.id), id: user.id });
        } else {
          throw new Error("password is not correct");
        }
      } catch {
        throw new Error("email is not exist in DB");
      }
    }
  }
};
