import { GraphQLServer } from "graphql-yoga";
import schema from "../schema";
import { isAuthenticated } from "./middleware";
// import passport from "./passport";
// console.log("passport : ", passport);
// import { prisma } from "../generated/prisma-client";
// console.log("prisama :", prisma);

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const FRONTURL = process.env.FRONTURL || "http://localhost:3000";

// cors 세팅
const options = {
  port: PORT,
  cors: {
    credentials: true,
    origin: [FRONTURL]
  }
};

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

// google auth
// server.express.get("/auth/google", passport);

// server.start(options, ({ port }) => { // cors 포함
// cors 제외
server.start(({ port }) => {
  console.log(`Server is running on port:${port}`);
});
