const app = require("./app");
const connectDatabase = require("./db/database");

// config
// if(process.env.NODE_ENV !== "PRODUCTION")
//     require("dotenv").config({ path:`./config/.env` });



// Handling uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
})

// connect Database
connectDatabase();

// Create server
const PORT = process.env.PORT;
console.log("PORT is: ",PORT);
const server = app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandle promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})