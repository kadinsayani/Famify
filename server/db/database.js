import mongoose from "mongoose";

// dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const atlasURI = process.env.ATLAS_URI;

mongoose.connect(
    atlasURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("Successfully connected to MongoDB.");
      } else {
        console.log(err);
      }
    }
);

export default mongoose