import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

import dotenv from "dotenv";
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Authorization Bearer에서 jwt 토큰를 찾는 역할;;
  secretOrKey: process.env.JWT_SECRET
};

//payload로 넘겨받은 정보를 이용해 db에서 해당 유저 정보를 가져온다.
//user가있으면 done으로 넘겨준다.
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });

    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

//전달 받은 user를 request 객체에 user정보를 붙여준다.
export const authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

passport.use(new Strategy(jwtOptions, verifyUser));

//토큰을해석해서 callback함수인 verifyUser에게 넘겨준다.
// ..strategy을 사용하면 그 strategy 가 모든 작업을 한 후에 결과물을 payload에 전달을 해준다.

passport.initialize();

// passport는 인증 관련한모든일을한다.
// jwt토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 저장한다.
// 토큰에서 정보를 가져와서 request에 붙여준다
// 토큰을 가져와서 해독한후에 사용자 객체를 request에 추가해준다.
// passport을 이용해 자동으로 해줄수도 있고, 이러한 작업을 수동으로 해줄 수도 있다.

//전체적인 flow
//토큰을 받아서 해석하고,사용자를 찾고 사용자가 존재한다면 req객체에 사용자를 추가하고 나면
// graphql를 실행;;;
