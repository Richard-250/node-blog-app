import dotenv from 'dotenv';

dotenv.config();

const config = {
    development: {
        url: process.env.DEV_DATABASE_URL
      } 
}

export default config