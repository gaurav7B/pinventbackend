const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require('path');

const app = express()

const PORT= process.env.PORT || 5000;

//connect to mongo db and start server
mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
          app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`)
          })
        })
        .catch((err) => console.log(err))



//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(cors({
  origin:["http://localhost:3000" , "https://pinvent-app.vercel.app"],
  credentials:true,}
));

app.use("/uploads", express.static(path.join(__dirname, "uploads")))


//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

//Routes
app.get("/", (req,res)=>{
    res.send("Home Page");
});

//Error Middleware
app.use(errorHandler);














// // connect to db
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Gaurav:bhoitegaurav7@cluster0.o0pwbte.mongodb.net/Pinvent-app?retryWrites=true&w=majority&appName=AtlasApp";
// const PORT = process.env.PORT || 5000; // Use the PORT environment variable or default to 5000

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
//     // Start your Express.js server
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } finally {
//     // Ensure that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);