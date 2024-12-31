import Listing from '../../models/listings/listing.mjs'
import express, { Router } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import residenceRouter from './residence.mjs'
import listing from '../../models/listings/listing.mjs'
// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/')
const router = Router()

router.use('/residence', residenceRouter)

router.use(express.json())

router.get('/', async (req, res) => {
  try {
    const allListings = await Listing.find()
    return res.send(allListings)
  } catch (error) {
    return res.send({ error: error.message })
  }
})

// Get all Listing

router.get('/', async (req, res) => {
  const { type, cursor } = req.query
  const query = {}
  if (type) {
    query.type = type
  }
  if (cursor) {
    query._id = {$lt:cursor}
  }
  try {
    const allListings = await Listing.find(query, null, {limit: 5, sort: {_id:-1}})
    return res.send(allListings)
  } catch (error) {
    return res.send({ error: error.message })
  }
})
// Search
router.get("/search", async (req, res) => {
  const { q, type, category } = req.query 
  const query = {}
  if (q) {
    query['$or'] = [
      { title: { $regex: q, $options: i } },
      { location: { $regex: q, $options: i } },
    ] 
  }
  if (type) {
    query.type = type
  }
  if (category) {
    query.adType = category
  }

  try {
    const searchOptions = await Listing.find(query)
    return res.send(searchOptions)
  } catch (error) {
    return res.send({error: error.message})
  }
})

// Get one Listing
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const singleListing = await Listing.findById(id)
    if (!singleListing) return res.send({ error: 'No listing found!' })

    return res.send(singleListing)
  } catch (error) {
    return res.send({ error: error.message })
  }
})

// Delete Listing

router.delete("/:id", async (req, res) => {
  const { id } = req.params 
  
  const toBeDeleted = await Listing.findById(id)
  if (!toBeDeleted) return res.send("Listing not found")
  
  try {
    await Listing.findByIdAndDelete(id)
    toBeDeleted.images.forEach(item => {fs.unlinkSync(destination + item)})
    return res.send({msg: "Deleted with success!"})
  } catch (error) {
    return res.send({error: error.message})
  }
})

export default router
