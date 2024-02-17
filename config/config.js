const config = {
	env: process.env.NODE_ENV || "development",
	port: process.env.PORT || 5002,
	jwtSecret: process.env.JWT_SECRET || "YOUR_secret",
	mongoUri: process.env.MONGODB_URI || "connectionhere"
};
export default config;