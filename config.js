const dotenv = require('dotenv');

const result = dotenv.config({ path: `.env.${process.env.NODE_ENV}` || '.env.dev' });

if (result.error) {
    throw result.error;
}

const { parsed: envs } = result;
console.log(envs);
module.exports = envs;