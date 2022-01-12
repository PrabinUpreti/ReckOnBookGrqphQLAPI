import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import rootResolver from "./graphql/resolvers/index.js";
import Schema from "./graphql/schema/index.js";
import isAuth from "./middleware/isAuth.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.username}:${process.env.password}@${process.env.cluster}.mygjj.mongodb.net/${process.env.DB}?retryWrites=${process.env.isWrite}&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Server Connected");
  })
  .catch((err) => {
    console.log(err);
  });
