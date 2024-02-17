import dotenv from 'dotenv';
dotenv.config();

console.log("mongo",process.env.MONGODB_URI)
const config = {
	env: process.env.NODE_ENV || "development",
	port: process.env.PORT || 5002,
	jwtSecret: process.env.JWT_SECRET || "YOUR_secret",
	mongoUri: process.env.MONGODB_URI,
};
export default config;