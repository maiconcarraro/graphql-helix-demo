import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from "graphql";

export const AlbumType = new GraphQLObjectType({
  name: "Album",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString }
  }
});

export const ArtistType = new GraphQLObjectType({
  name: "Artist",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve: (artist, _args, ctx) => {
        return ctx.db.all(
          `SELECT AlbumId as id, Title as title
           FROM albums where ArtistId = ?`,
          [artist.id]
        );
      }
    }
  }
});
