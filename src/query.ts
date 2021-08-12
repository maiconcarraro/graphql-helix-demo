import { GraphQLObjectType, GraphQLList } from "graphql";
import { ArtistType } from "./type";

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    artists: {
      type: new GraphQLList(ArtistType),
      resolve: async (_root, _args, ctx) => {
        return ctx.db.all(
          `SELECT ArtistId as id, Name as name 
           FROM artists`
        );
      }
    }
  })
});

export default query;
