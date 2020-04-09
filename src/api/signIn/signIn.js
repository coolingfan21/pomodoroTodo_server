import { prisma } from "../../../generated/prisma-client";
import { generateToken } from "../../util";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const HASHSECRET = process.env.HASHSECRET;

export default {
  Mutation: {
    signIn: async (_, args) => {
      const { email, password } = args;

      // 해시 생성
      const hash = crypto.createHmac("sha256", HASHSECRET);
      hash.update(password);
      const output = hash.digest("hex");
      console.log("password : ", password);
      console.log("output : ", output);
      console.log("HASHSECRET : ", HASHSECRET);
      //저장된 유저 정보 가져오기

      const user = await prisma.user({ email });
      console.log("user.password : ", user.password);
      // 해슁 비교하기
      if (user.password === output) {
        return JSON.stringify({ token: generateToken(user.id), id: user.id });
      } else {
        throw new Error("password is not correct");
      }
    }
  }
};
