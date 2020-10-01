require("dotenv").config();

// DB
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) =>
  console.log(`Mongoose Connection Error ${err.message}`)
);
mongoose.connection.once("open", () => console.log("MongoDB Connected"));

// Model
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

const app = require("./app");

app.listen(5000, () => console.log("Server running on port 5000"));
