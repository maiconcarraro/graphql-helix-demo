import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { ArtistType } from "./type";
import { InputArtistType } from "./inputtypes";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    artistUpdate: {
      type: ArtistType,
      args: {
        input: { type: new GraphQLNonNull(InputArtistType) }
      },
      resolve: async (_root, args, ctx) => {
        const { input } = args;

        const result = await ctx.db.run(
          `UPDATE artists
           SET Name = ?
           WHERE ArtistId = ?`,
          [input.name, input.id]
        );

        if (result.changes === 0) {
          return Promise.reject("Artist not found");
        }

        const artist = await ctx.db.get(
          `SELECT ArtistId as id, Name as name 
            FROM artists
            WHERE ArtistId = ?`,
          [input.id]
        );

        // for subscription
        ctx.pubsub.publish(`artist_${input.id}`, { artistChanges: artist });
        return artist;
      }
    }
  })
});

export default mutation;
