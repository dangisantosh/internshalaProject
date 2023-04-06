const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")


//Handling an uncaught exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught excemption`)
    process.exit(1)
})
// Config
dotenv.config({path: 'backend/config/config.env'})

//connecting to database
connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on https://localhost:${process.env.PORT}`)
})

//unhandled Promise Rejection
process.on('unhandledRejection', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled server rejection`);

    server.close(()=>{
       process.exit(1);
    })
})