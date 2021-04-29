import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs, { Context } from "./schema/schema";
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context({ req, res }): Context {
    return {
      req,
      res
    };
  }
});

if (!process.env.MONGO_URI) {
  throw new Error("Mongo uri is required");
}
if (!process.env.JWT_KEY) {
  throw new Error("jwt key is required");
}

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};
connectMongo();

server.listen().then(({ url }) => {
  console.log(`Server ready at url ${url}`);
});
