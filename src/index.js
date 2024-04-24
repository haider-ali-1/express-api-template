import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

start();
