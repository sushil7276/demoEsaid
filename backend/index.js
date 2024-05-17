const app = require("./app");
// dotenv file configuration
require("dotenv").config({ path: "backend/config/config.env" });

// Connect to database
const connectDB = require("./config/database");
connectDB();

app.listen(4000, () => {
  console.log(`server started on Port: ${process.env.PORT}`);
});
