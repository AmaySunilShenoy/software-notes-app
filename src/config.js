const dotenv = require('dotenv');

const result = dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.development' });

if (result.error) {
    throw result.error;
}

const { parsed: envs } = result;
console.log(envs);
module.exports = envs;