import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
  joinCode: {type: String, required: true, unique: true},
  members: [{type: ObjectId, ref: 'User'}]
});

const Family = mongoose.model("Family", familySchema);

export default Family;
