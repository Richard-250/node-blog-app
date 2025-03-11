// import { connection } from "mongoose";

export const signUp = {
  tags: ["User Authentication"],
  description: "signup a user",
  operationId: "signUpUser",
  parameters: [],
  requestBody: {
    content: {
      //content-type
      "application/json": {
        schema: {
          type: "object",
          properties: {
            fullName: {
              type: "string",
              description: "user fullName",
              example: "Cyubahiro",
            },
          },
        },
      },
    },
  },
};
