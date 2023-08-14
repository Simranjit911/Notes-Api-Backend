const express = require("express")
const app = express()
const dotenv=require("dotenv")
dotenv.config()


//Mongoose
const mongoose = require("mongoose")


//Importing Routes
const userRouter = require("../routes/userRoutes")
const notesRouter = require("../routes/notesRoutes")

//For using Json
const bodyParser = require("body-parser")
app.use(bodyParser.json())

//Routes
app.use("/users", userRouter)
app.use("/notes", notesRouter)
app.get("/", (req, res) => {
    res.send("Ok")
})

//Port
const port = process.env.PORT || 3100
const connectionString = process.env.MONGO_URL

//Db connection
(async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB Atlas');


    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
