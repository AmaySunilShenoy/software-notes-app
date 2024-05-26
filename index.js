const app = require('./src/app');

// Load environment variables
const config = require("./config"); 
const {PORT} = config;

const server = app.listen(PORT , () => {
	console.log(`Application running on port: ${PORT}`);
});

module.exports = server;