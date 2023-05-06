import { db } from "./dbconnect.js"
import { ObjectId } from "mongodb"

const coll = db.collection('docks')

export async function addDock(req, res) {
    const newDock = req.body
    await coll.insertOne(newDock)
    res.send({ message: "Dock Successful"})
}


export async function getAllDocks(req, res) {
        const docks = await coll.find({}).toArray()
        res.send(docks)
}

export async function deleteDock(req, res){
    const dockId = {"_id": new ObjectId(req.params.dockId)}
    
    await coll.findOneAndDelete(dockId)
    res.send()
}

export async function updateDock(req, res) {
    try {
      const dockId = { _id: new ObjectId(req.params.dockId) };
      const rateDock = { $set: req.body };
      const returnDock = { returnNewDocument: true };
  
      const query = await coll.findOneAndUpdate(dockId, rateDock, returnDock);
  
      res.send();
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message });
    }
  }
  