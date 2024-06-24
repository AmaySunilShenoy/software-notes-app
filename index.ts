import app from "./src/app";

// Load environment variables
import config from "./src/config";
const {PORT} = config;

const server = app.listen(PORT , () => {
	console.log(`Application running on port: ${PORT}`);
});


export default server;