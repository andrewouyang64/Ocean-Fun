import React from 'react';
import { Link } from 'react-router-dom';

const adList = ({ ads,}) => {
  if (!ads.length) {
    return <h3>No Ad posted Yet</h3>;
  }

  return (
    <div className='instructorList'>
      {ads.map((title) => (
            <div className='title'>
                {title}
                </div>
            ))}

            <div className='addNewAd'>
                <Link to ={'/newAd'}>
                    Create New ad
                 </Link>
             </div>                
      
    </div>
  );
};

export default adList;
