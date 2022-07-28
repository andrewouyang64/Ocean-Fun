import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import AdList from '../components/AdList';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { QUERY_ADS } from '../utils/queries';
import { ADD_COMMENTS } from '../utils/mutation';

const ViewAd = () => {
  const { loading, data } = useQuery(QUERY_ADS);
  const ads = data?.ads || [];
  const [selectedAd, setSelectedAd] = useState();
  return (
        <div className="viewAd">
            <div className='adTitle'>
                {loading ? (
                <div>Loading.....</div>
                    ) : (
                    <AdList
                    ads={ads}
                    onSelect={(ad) => setSelectedAd(ad)}/>  
                    )}
            </div>
    
            <div className='adAndComment'>
                <div className='adContent'>
                    {selectedAd && <AdDescription adContent={selectedAd}/> }
                </div>

                <div className='commentList'>
                    {selectedAd && <CommentList comments={selectedAd}/> }
                </div>
                <CommentForm adId = {selectedAd._id}/>
            </div>    
        </div>
    
  );
};

export default ViewAd;
