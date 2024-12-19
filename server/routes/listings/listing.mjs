import Listing from "../../models/listings/listing.mjs";
import express, { Router } from 'express'

import residenceRouter from './residence.mjs'

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


export default router