const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

const upload = require("./uploadConfig");
const userController = require("./controllers/userController");

const app = Express();
app.use(cors());
app.use(Express.json({ limit: '50mb' }));

app.use(Express.json()); // Menggunakan middleware untuk mengizinkan penggunaan JSON dalam permintaan
app.use(Express.urlencoded({ extended: true })); // Menggunakan middleware untuk mengizinkan penggunaan URL-encoded dalam permintaan

app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));

const CONNECTION_STRING = "mongodb+srv://bintangsiahaan21:E8Sa7Ii3eCqikNhv@netlab.yuyii8i.mongodb.net/?retryWrites=true&w=majority&appName=Netlab";

const DATABASENAME = "whattoeatdb";
var database;

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB via Mongoose"))
  .catch(err => console.error("Could not connect to MongoDB...", err));

app.listen(3000, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) throw error;
    database = client.db(DATABASENAME);
    console.log("Successfully connected to server at port 3000");
  });
});

app.post("/api/whattoeat/signup", upload.single('image'), userController.addUser);
app.post("/api/whattoeat/login", userController.loginUser);

app.get('/api/whattoeat/GetRecommendation', (request, response) => {
  database.collection("whattoeatcollection").find({}).toArray((error, result) => {
    if (error) throw error;
    response.send(result);
  });
});

app.post('/api/whattoeat/AddRecommendation', upload.single('image'), async (request, response) => {
  try {
    const { newRecommendation } = request.body;
    const image = request.file ? `/uploads/${request.file.filename}` : null;

    const numOfDocs = await database.collection("whattoeatcollection").countDocuments({});

    await database.collection("whattoeatcollection").insertOne({
      id: (numOfDocs + 1).toString(),
      description: newRecommendation,
      image: image,
      recipe: "" 
    });

    response.json("Successfully Added!");
  } catch (error) {
    response.status(500).json({ status: "error", data: error });
  }
});

app.delete('/api/whattoeat/DeleteRecommendation', async (request, response) => {
  try {
    const { id } = request.query;
    const result = await database.collection("whattoeatcollection").findOneAndDelete({ id });
    response.json("Successfully Deleted!");
  } catch (error) {
    response.status(500).json({ status: "error", data: error });
  }
});

app.post('/api/whattoeat/AddRecipe', async (request, response) => {
  try {
    const { id, recipe } = request.body;
    await database.collection("whattoeatcollection").updateOne({ id }, { $set: { recipe } });
    response.json("Successfully Added Recipe!");
  } catch (error) {
    response.status(500).json({ status: "error", data: error });
  }
});

app.get('/api/whattoeat/GetRecipe', (request, response) => {
  const { id } = request.query;
  database.collection("whattoeatcollection").findOne({ id }, (error, result) => {
    if (error) throw error;
    response.send(result);
  });
});
