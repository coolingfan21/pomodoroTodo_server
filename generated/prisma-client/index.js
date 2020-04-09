"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

import dotenv from "dotenv";
dotenv.config();
const backendpoint = process.env.BACKENDPOINT;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Todos",
    embedded: false
  },
  {
    name: "Pomo",
    embedded: false
  },
  {
    name: "Tag",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: backendpoint
});
exports.prisma = new exports.Prisma();
