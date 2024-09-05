import mongoose from "mongoose";
import { mONGODBURI } from "./config.js";

console.log(mONGODBURI);

const connect = mongoose.connect(mONGODBURI);

export { connect };