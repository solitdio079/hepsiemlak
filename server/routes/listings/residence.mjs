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
    const data = req.body
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