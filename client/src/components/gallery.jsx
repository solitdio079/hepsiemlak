/* eslint-disable react/prop-types */
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
export default function Gallery({ images }) {
  const imagesObject = images.map((item) => {
    return {
      original: item,
      thumbnail: item,
    }
  })
     return <ImageGallery items={imagesObject} />
}
