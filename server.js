const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  // Always include this for proper connection handling
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.error("DB connection error:", err));


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
