// import { connection } from "mongoose";

// import { required } from "joi";

// import { response } from "express";

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
            telephone: {
              type: "string",
              description: "Uesr telephone",
              example: "0783732286",
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
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              description: "User email",
              example: "cyubahirorichard250@gmail.com",
            },
            password: {
              type: "string",
              description: "User password",
              example: "Password123@",
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
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
              },
              token: {
                type: "string",
                example: "hjdsgfdugsfueugf",
              },
            },
          },
        },
      },
    },
    401: {
      description: "Email or password are not valid",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Invalid email or passsword",
              },
            },
          },
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "User not found",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Server error",
    },
  },
};


export const verifyEmail = {
  tags: ["Verify Email"],
  description: "Verify User Email",
  operationId: "Verify Email",
  parameters: [
    {
      name: "token",
      in: "params",
      description: "Token sent to the user's email",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "Email verified successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Email verified",
              },
            },
          },
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "User not founf",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Use Already Verified",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: " User Already verified",
              },
            },
          },
        },
      },
    },
    401: {
      description: "Invalid Token",
    },
    500: {
      description: "Server error",
    },
  },
};