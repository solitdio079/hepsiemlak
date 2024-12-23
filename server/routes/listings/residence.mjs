import express, { Router } from 'express'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import Residence from '../../models/listings/residence.mjs'

// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/')


// Initializing multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})
const upload = multer({ storage })


const router = Router()

router.post("/", upload.array("images", 20), async (req, res) => {
  if (!req.user) return res.send({ error: 'Not logged in!' })
  console.log(typeof(req.body.adType))
  const numberOfRooms = {}
  const heating = {}
  const floor = {}
  const area = {}
  const location = {}
  const numberOfToilets = req.body.numOfToilets
  const furnishing = req.body.furnishing
  const state = req.body.state
  

  // Set number of Rooms
  numberOfRooms.rooms = req.body.numOfRooms.split("+")[0]
  numberOfRooms.hall = req.body.numOfRooms.split("+")[1]
  //Set heating
  heating.heatingType = req.body.heating.split("/")[0]
  heating.fuel = req.body.heating.split("/")[1]
  // Set floor
  floor.specific = req.body.floor.split("/")[1]
  floor.total = req.body.floor.split("/")[0]
  // set area
  area.gross = req.body.area.split("/")[0]
  area.net = req.body.area.split("/")[1]
  // set Location
  location.country = req.body.location.split(",")[0]
  location.city = req.body.location.split(",")[1]
  location.district = req.body.location.split(",")[2]
  location.street = req.body.location.split(",")[3]
  location.door = req.body.location.split(",")[4]


  const details = { numberOfRooms, numberOfToilets, heating, floor, furnishing, state }
 
  for (const key in details) {
    if (details[key]) {
      delete req.body[key]
    }
  }
  const data = req.body
  data.details = details
   data.owner = {
     name: req.user.fullName,
     email: req.user.email,
     picture: req.user.picture,
   }
  data.area = area
    //const numberOfRooms = req.body.numberOfRooms.split("+")
    data.images = req.files.map(item => item.filename)

    try {
        const newResidence = new Residence(data)
        await newResidence.save()
        return res.send({msg: "Residence Created!"})
    } catch (error) {
        return res.send({error: error.message})
    }
    
})

export default router