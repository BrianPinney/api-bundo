import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addDock, deleteDock, getAllDocks, updateDock } from "./src/dockEndPoints.js"


const PORT = 3000  
const app = express()

app.use(cors())
app.use(express.json())

app.post("/docks", addDock)
app.get("/docks", getAllDocks)
app.patch("/docks/:dockId", updateDock)
app.delete("/docks/:dockId", deleteDock)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`)
})

export const api = functions.https.onRequest(app) 
