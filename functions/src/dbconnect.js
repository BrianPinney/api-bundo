import { MongoClient } from "mongodb";
import { URI } from "../secrets.js";

const client = new MongoClient(URI)

export const db = client.db('bundo-bp')