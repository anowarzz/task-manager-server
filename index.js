const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middle wares
app.use(cors());
app.use(express.json());


//Connecting to mongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v1rp4a3.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});




//Performing crud operations


async function run () {
    try{

const tasksCollection = client.db("taskManager").collection("tasks")



// Adding a task to the database
app.post("/tasks", async(req, res) => {
    const task = req.body;
    const result = await tasksCollection.insertOne(task)
    res.send(result)
})


// Loading all tasks from database
app.get("/tasks", async(req, res) => {
    const query = {}
    const tasks = await tasksCollection.find(query).toArray();
    res.send(tasks)
})


// Loading users uncompleted tasks from db  using email
app.get("/myTasks", async(req, res) => {
    const email = req.query.email;
    const query = {
        userEmail : email,
        isComplete: false
    }
    const cursor = tasksCollection.find(query);
    const tasks = await cursor.toArray();
    res.send(tasks)
})


// Loading completed tasks of a user
app.get("/completeTasks", async(req, res) => {
    const email = req.query.email;
    const query = {
        userEmail : email,
        isComplete: true
    }
    const result = await tasksCollection.find(query).toArray();
    res.send(result)
})




// Deleting one task from database
app.delete("/tasks/:id", async(req, res) => {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await tasksCollection.deleteOne(query);
    res.send(result)
})

// Editing a task
app.put("/tasks/:id", async(req, res) => {
    const id = req.params.id;
    const filter = {_id : ObjectId(id)};
    const taskText =  req.body.taskDescription;
    option = {upsert : true};

    const updatedTask = {
        $set: {
          description : taskText  
        },
    }
    const result = await tasksCollection.updateOne(filter, updatedTask, option)
    res.send(result);
})


// Marking a task as completed
app.put("/tasks/doneTasks/:id", async(req, res) => {
    const id = req.params.id;
    console.log(id);
    
    const filter = {_id : ObjectId(id)};
    const option = {upsert : true}
    const updatedDoc = {
        $set : {
            isComplete: true
        }
    }
    const result = await tasksCollection.updateOne(filter, updatedDoc, option);
    res.send(result)
})


// Marking tasks as not completed
app.put("/tasks/notDoneTasks/:id", async(req, res) => {
    const id = req.params.id;
    const filter = {_id : ObjectId(id)};
    const option = {upsert : true}
    const updatedDoc = {
        $set : {
            isComplete: false
        }
    }
    const result = await tasksCollection.updateOne(filter, updatedDoc, option);
    res.send(result)
})






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