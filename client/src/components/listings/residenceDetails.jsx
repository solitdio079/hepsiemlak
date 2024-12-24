/* eslint-disable react/prop-types */
//import Gallery from "../gallery";

import { url } from "../../utils/serverUrl"
import Gallery from "../gallery"

export default function ResidenceDetails({listing}) {
    // const detailTitles = [
    //   'ID',
    //   'Date',
    //   'Statut',
    //   'Type',
    //   'Gross/Net m²', 'Nombres d\'etages', 'Etage', 'Age', 'Chauffage', 'Carburant', 'Fournitures', 'Utilisation', 'Etat'
    // ]
    //  listing.details: {
    //     numberOfRooms: {
    //         rooms: Number,
    //         hall: Number
    //     },
    //     numberOfToilets: Number,
    //     heating: {
    //         heatingType: String,
    //         fuel: String
    //     },
    //     state: {
    //        type: String
    //     },
    //     floor: {
    //         total: Number,
    //         specific: Number
    //     },
    //     furnishing: {
    //         type: String
    //     }
    // }
    // const listingSchema = new Schema(
    //   {
    //     title: {
    //       type: String,
    //       required: true,
    //     },
    //     images: {
    //       type: Array,
    //       required: true,
    //     },
    //     age: Number,
    //     usage: String,
    //     location: {
    //       country: String,
    //       district: String,
    //       street: String,
    //       door: String,
    //       city: String,
    //     },
    //     area: {
    //       net: Number,
    //       gross: Number,
    //     },
    //     adType: {
    //       type: String,
    //       required: true,
    //     },
    //     price: {
    //       Type: Number,
    //     },
    //     category: {
    //       type: String,
    //       required: true,
    //     },
    //     description: {
    //       type: String,
    //     },
    //     owner: {
    //       name: String,
    //       picture: String,
    //       email: String,
    //     },
    //   },
    //   options
    // )
    const adresse = listing.location.country + "/" + listing.location.city + "/" + listing.location.district + "/" + listing.location.street + "/" + listing.location.door
    const images = listing.images.map(item => url + "/" + item)

    const finalForm = {
      'ID': listing._id,
      'Mis a jour le': listing.updatedAt,
      'Surface(Total)': listing.area.gross,
      'Categorie': listing.category,
      'Type': listing.adType,
      'Surface(Net)': listing.area.net,
      'Nombre de Chambres': listing.details.numberOfRooms.rooms,
      'Nombres de Salons': listing.details.numberOfRooms.hall,
      'Nombre de Toilets': listing.details.numberOfToilets,
      'Chauffage': listing.details.heating.heatingType,
      'Carburant': listing.details.heating.fuel,
      'Etat du Batiment': listing.details.state,
      'Etages': listing.details.floor.total + '/' + listing.details.floor.specific,
      'Fournitures': listing.details.furnishing,
    }
    const detailsTitles = Object.keys(finalForm)
    return (
        <>
            <h1 className="text-lg"> {listing.title} </h1>
        <div className="flex flex-col lg:flex-row">
          <Gallery images={images} />
         
                <ul className="flex flex-col">
                    <li className="text-primary"> {listing.price} Franc CFA</li>
                    <li>{adresse}</li>
              {detailsTitles.map((item) => (
                <li
                  key={Math.random() * 10e9}
                  className="flex flex-row justify-between"
                >
                  {' '}
                  <span className="font-semibold">{item}</span>{' '}
                  <span> {finalForm[item]} </span>{' '}
                </li>
              ))}
            </ul>
          
        </div>
        <OwnerCard owner={listing.owner} />
      </>
    )
}

function OwnerCard({ owner }) {
    return (
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={
                  url + "/"+owner.picture ||
                  'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                }
              />
            </div>
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title"> {owner.name} </h2>
        
          <div className="card-actions">
            <button className="btn btn-primary">Contactez</button>
          </div>
        </div>
      </div>
    )
    
}