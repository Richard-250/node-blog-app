// import { connection } from "mongoose";

import { response } from "express";

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
              example: "Cyubahiro Richard",
            },
            email: {
              type: "string",
              description: "User email",
              example: "cyubahirorichard250@gmail.com",
            },
            password: {
              type: "string",
              description:
                "password must include one number small letters and characters + capital letters",
              example: "Alphazero@123",
            },
          },
        },
      },
    },
  },
  responses: {
    // response code
    201: {
      description: "User created successfully.",
    },
    //response code
    500: {
      description: "server error",
    },
  },
};

export const loginUser = {
  tags: ["User Authentication"],
  description: "Logs in a user",
  operationId: "loginUser",
  parameters: [],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "User email",
              example: "admin@example.com",
            },
            password: {
              type: "string",
              description: "User password",
              example: "Password123@",
            },
          },
          required: ["email", "password"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "Successful login",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Login successful",
              },
              user: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "wigfew2eur43",
                    },
                    fullName: {
                        type: "string",
                        example: "Kagabo Mukabonya",
                    },
                    email: {
                        type: "string",
                        example: "blogger@example.com",
                    },
                    role: {
                        type: "string",
                        example: "admin",
                    },
                },
                token: {
                    type: "string",
                    example: "hjdsgfdugsfueugf",
                },
              }
            },
          },
        },
      },
    },
    401: {
        description: "Inavlid email or password",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Ivalid eamil or passsword",
                        }
                    }
                }
            }
        }
    }
  },
};
