import dotenv from "dotenv";

const result = dotenv.config({
  path: process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`
    : ".env.development",
});

if (result.error) {
  throw result.error;
}

const { parsed: envs } : any = result;
console.log(envs);

export default envs;
