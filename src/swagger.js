
import { signUp, loginUser, verifyEmail } from "./docs-data.js";
import 'dotenv/config'


export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'iBlog APIs Document',
        description:
        'This a simple api about an iBlog back-end server',
        termsOfService: '',
        contact: {
            name: 'iBlog',
            email: 'iBlog@gmail.com',
            url: '',
        },
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}`,
            description: 'Local server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                in: 'header',
                bearerFormat: 'JWT'
            },
        },
    },
    paths: {
        '/api/v1/users/signup': {
            post: signUp,
        },
        '/api/v1/users/login': {
            post: loginUser,
        },
        '/api/v1/users/verify-email/{token}': {
            get: verifyEmail,
        },
    },
        
};