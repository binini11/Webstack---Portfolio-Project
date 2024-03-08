import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = "mongodb+srv://admin:98765432100@cluster0.yqcge2l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 3000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  .catch(err => {
    console.error("MongoDB connection unsuccessful:", err.stack);
    process.exit(1);
  })
  .then(async client => {
    console.log("MongoDB connection successful");
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
