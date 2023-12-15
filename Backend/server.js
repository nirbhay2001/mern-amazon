const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({path:"Backend/config/config.env"})
const connectDB = require("./config/database");
const port = process.env.PORT || 4000;


connectDB();



app.listen(port, () => {
    console.log(`your server is running on port ${port} `);
});
