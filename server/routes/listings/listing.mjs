import Listing from "../../models/listings/listing.mjs";
import express, { Router } from 'express'

import residenceRouter from './residence.mjs'
import listing from "../../models/listings/listing.mjs";

const router = Router()

router.use("/residence", residenceRouter)

router.use(express.json())

router.get("/", async (req, res) => {
    try {
        const allListings = await Listing.find()
        return res.send(allListings)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

// Get all Listing 

router.get("/", async (req, res) => {
    const { type } = req.query
    const query = {}
    if (type) {
        query.type = type
    }
    try {
        const allListings = await Listing.find(query)
        return res.send(allListings)
    } catch (error) {
        return res.send({error: error.message})
    }
})

// Get one Listing
router.get("/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const singleListing = await Listing.findById(id)
        if (!singleListing) return res.send({ error: 'No listing found!' })
        
        return singleListing
    } catch (error) {
        return res.send({error: error.message})
    }
})

export default router