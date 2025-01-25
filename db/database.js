const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDatabase;
