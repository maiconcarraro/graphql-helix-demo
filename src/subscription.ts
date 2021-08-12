import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from "graphql";
import { ArtistType } from "./type";

const subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: () => ({
    artistChanges: {
      type: ArtistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      subscribe: async (_root, args, ctx) => {
        // initial test
        setTimeout(async () => {
          const artist = await ctx.db.get(
            `SELECT ArtistId as id, Name as name 
            FROM artists
            WHERE ArtistId = ?`,
            [args.id]
          );

          ctx.pubsub.publish(`artist_${args.id}`, { artistChanges: artist });
        }, 1000);

        return ctx.pubsub.asyncIterator(`artist_${args.id}`);
      }
    }
  })
});

export default subscription;
