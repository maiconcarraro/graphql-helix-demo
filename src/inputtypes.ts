import {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from "graphql";

export const InputArtistType = new GraphQLInputObjectType({
  name: "ArtistInput",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
});
