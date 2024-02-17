import config from "./config/config.js";
import app from "./app/express.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, 
	{ 
		useUnifiedTopology: true,
		useNewUrlParser: true, 
	});
mongoose.connection.on("error", () => {
	throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
app.get("/", (req, res) => {
	res.json({message: "Welcome to Dress Store Application"});
});
app.listen(config.port, (err) => {
	if (err) {
		console.log(err);
	}
	console.info("Server started on port %s.", config.port);
});
