import { db } from "./dbconnect.js"
import { ObjectId } from "mongodb"

const coll = db.collection('docks')
const coll2 = db.collection('ratings')

//calc avg function - return avg

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
export async function getRatings(req, res) {
      const { ratingValue } =req.params
      const docks = await coll.find({ "rating": ratingValue }).toArray()
      res.send(docks)
}

export async function deleteDock(req, res){
    const dockId = {"_id": new ObjectId(req.params.dockId)}
    
    await coll.findOneAndDelete(dockId)
    res.send()
}

// export async function updateDock(req, res) {
//     try {
//       const dockId = { "_id": new ObjectId(req.params.dockId) };

//       const rateDock = { $set: req.body };
//       const returnDock = { returnDocument: false };
  
//       //await coll.updateOne(dockId, rateDock, returnDock
     
//       await coll.updateOne(
       
//         { $push: {rating: rateDock.rating}}
//         );


  
//       res.send({message: "Rating Achievement Unlocked 🎖️"});
//     } catch (err) {
//       console.error(err);
//     }
//   }
  
export async function updateDock(req, res) {
  try {
    const {rating} = req.body;
    const dockId = { "_id": new ObjectId(req.params.dockId) };
    await coll.findOneAndUpdate(dockId,  { $push: { ratings: rating }}, {
      upsert: true,
      returnDocument: 'after', // this is new !
    });

    const updateDock = await coll.findOne(dockId);



    let avgRating = 0
    console.log('bruiN',updateDock)

    updateDock.ratings.map(rating => {
      if (rating) {
        avgRating+=rating
      }
    })
    
    avgRating=Math.ceil(avgRating/updateDock.ratings.length)
    
    await coll.findOneAndUpdate(dockId,  { $set: { rating: avgRating } });


    getAllDocks(req, res)

    // const rateDock = { $set: req.body };
    // const returnDock = { returnDocument: true };



    // await addRatingToDatabase(dockId, rating);

    // res.send({ message: "Rating Achievement Unlocked 🎖️" });
  } catch (err) {
    console.error(err);
    res.status(500).json({error:err})
  }
}

// async function addRatingToDatabase(dockId, rating) {
//   await coll.updateOne(dockId, { $push: { ratings: rating } });
// }
 