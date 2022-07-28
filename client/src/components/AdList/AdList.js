
// ad details below to be exported to Adlist
// const AdDetails = ({ ad }) => {
//     return (
//         <div className='AdDetails'>
//             <h4>{ad.title}</h4>
//             <p>{ad.author</p>
//         </div>
//     )
// }

// export default AdDetails

import React, { useEffect, useState } from 'react';
// components below - import ads from xyz into the list 
import Ads from '../'

  const AdList = () => {
    const [ads, setAds] = useState(null)
    
    useEffect(() => {
        const fetchAds = async () => {
            const response = await fetch('http://localhost:3001/api/ads')
            const json = await response.json()    
        
            if (response.ok) {
                setAds(json)
            }
        }

        fetchAds()
    }, [])

// Addetails list imported from xyz 
return (
    <div className='adlist'>
        {ads && ads.map((ad) => (
            <AdDetails key={ad.id} ad={ad} /> 
        ))}
    </div>
)
}