import React from 'react';
import { useQuery } from '@apollo/client';

import AdList from '../components/AdList';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_ADS } from '../utils/queries';
import { QUERY_COMMENTS } from '../utils/queries';
import { ADD_COMMENTS } from '../utils/mutation';

const ViewAd = () => {
  const { loading1, data1 } = useQuery(QUERY_ADS);
  const ads = data1?.ads || [];

  const { loading2, data2 } = useQuery(QUERY_COMMENTS);
  const comments = data2?.comments || [];

  return (
    
      <div className="viewAd">
        <div className='adTitle'>
          {loading1 ? (
            <div>Loading.....</div>
                ) : (
                  <AdList
                    ads={ads}
                   />  
               )}
            </div>
    
        <div className='adContent'>
        {loading2 ? (
            <div>Loading.....</div>
                ) : (
            <AdDescription
            adContents={adContents} />
              )}
        </div>


         <div className='comments'>
            
            <CommentList
            comments={comments} />
               
         </div>
     
         <div className='addComment'>
            <CommentForm/>
         </div>

    </div>
    
  );
};

export default ViewAd;
