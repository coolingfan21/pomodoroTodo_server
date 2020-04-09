import { signOutToken } from "../../util";
export default {
  Mutation: {
    signOut: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return signOutToken(user.id);
    }
  }
};
