import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addDock, deleteDock, getAllDocks, getCityDocks, updateDock, addRating } from "./src/dockEndPoints.js"


// const PORT = 3000  
const app = express()

app.use(cors())
app.use(express.json())

app.get("/docks/", getAllDocks)
app.get("/docks/search/:cityValue", getCityDocks)
app.post("/docks", addDock)
app.put("/docks/:dockId", updateDock)
app.delete("/docks/:dockId", deleteDock)

app.post("/ratings", addRating)

app.get("/", (req,res) => {res.send("root")} )

// app.listen(PORT, () => {
//     console.log(`Listening on port: ${PORT}...`)
// })

export const api = functions.https.onRequest(app) 
