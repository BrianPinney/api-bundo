import { db } from "./dbconnect.js"
import { ObjectId } from "mongodb"

const coll = db.collection('docks')
const coll2 = db.collection('ratings')

export async function addDock(req, res) {
    const newDock = req.body
    await coll.insertOne(newDock)
    res.send({ message: "Dock Achievement Unlocked 🎖️"})
}

export async function addRating(req, res) {
  const newRating = req.body
  await coll2.insertOne(newRating)
  res.send({message: "Rating Achievement Unlocked 🎖️"})
}


export async function getAllDocks(req, res) {
        const docks = await coll.find({}).toArray()
        res.send(docks)
}

export async function getCityDocks(req, res) {
      const { cityValue } =req.params
      const docks = await coll.find({ "city": cityValue }).toArray()
      res.send(docks)
}

export async function deleteDock(req, res){
    const dockId = {"_id": new ObjectId(req.params.dockId)}
    
    await coll.findOneAndDelete(dockId)
    res.send()
}

export async function updateDock(req, res) {
    try {
      const dockId = { "_id": new ObjectId(req.params.dockId) };
      const rateDock = { $set: req.body };
      const returnDock = { returnDocument: false };
  
      await coll.findOneAndUpdate(dockId, rateDock, returnDock);
  
      res.send({message: "Rating Achievement Unlocked 🎖️"});
    } catch (err) {
      console.error(err);
    }
  }
  