import * as dotenv from "dotenv";
dotenv.config();

const config =  {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
        username: process.env.HTTP_BASE_USERNAME ?? '',
        password: process.env.HTTP_BASE_PASSWORD ?? '',
    },
};

export default config;