import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    createPomoTodo: async (_, args) => {
      const { createdBy, todoContent, tagContent, date } = args;

      try {
        await prisma.createPomo({
          createdBy,
          todoContent,
          tagContent,
          date
        });
        return true;
      } catch (error) {
        console.log("Cannot create pomo : ", error);
        return false;
      }
    }
  }
};
