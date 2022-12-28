const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middle wares
app.use(cors());
app.use(express.json());


//Connecting to mongoDB
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v1rp4a3.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});




//Performing crud operations


async function run () {
    try{

    }

    finally{

    }
}

run().catch((error) => console.error(error))

// Server api checkup
app.get('/', (req, res) => {
    res.send("Task Manager server running successfully");
});

// Server check on console
app.listen(port, () => {
    console.log(`Task manager running on port ${port}`);
    
})