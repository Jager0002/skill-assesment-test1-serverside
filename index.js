const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require("mongodb")
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ki23b.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

app.get("/", (req, res) => {
  res.send("running the server")
})

async function run() {
  try {
    await client.connect()
    const collection = client.db("TodoList").collection("taskCollection")

    app.post("/task", async (req, res) => {
      const task = req.body
      const result = await collection.insertOne(task)

      res.send(result)
    })

    app.get("/task", async (req, res) => {
      res.send(obj)
    })
    app.delete("/task", async (req, res) => {
      const result = await collection.deleteOne(query)
      res.send(result)
    })
  } finally {
  }
}

run().catch(console.dir)

app.listen(port, () => {
  console.log("listening to " + port)
})
