import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import AdList from '../components/AdList';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { QUERY_ADS_SPORT } from '../utils/queries';
import { QUERY_ADS_SURFING } from '../utils/queries';
import { QUERY_SINGLE_AD } from '../utils/queries';
import { QUERY_COMMENT } from '../utils/queries';

const ViewAd = () => {
  const { data } = useQuery(QUERY_ADS_SPORT);
  const adsSport = data?.ads || [];
  //sample datas
//   const ads = [ad1, ad2, ad3];
//   const ad1 = [{sport:['surfing', 'kitesurf', 'scubadiving']},
//             {titile: 'Sunday beach surfing'},
//             {Adthutor: 'Alicia'},
//             {content: 'This is a Sunday class for surfing beginner at Happy Beach'},
//             {createdAt: date},
//             {commnets: [{user: 'Andrew', comentText: 'Great class!', createdAt: date1},
//                         {user: 'Ken', commentText: 'Fun group', createdAt: date2}
//                         ]
//           }
//         ];
const ads=[];
if(!adsSport) {
    return prompt('No data found!')
    }
else if(adsSport.sport==='surfing') {
const {Loading, data} = useQuery(QUERY_ADS_SURFING)
      ads = data?.ads || [];
    }
else if(adsSport.sport==='kitesurf') {
      const {Loading, data} = useQuery(QUERY_ADS_KITESURF)
      ads = data?.ads || [];
    }
      {const {Loading, data} = useQuery(QUERY_ADS_SUBADIVING)
      ads = data?.ads || [];}

  const [selectedAd, setSelectedAd] = useState();
  return (
        <div className="viewAd">
            <div className='adTitle bb'>
                {loading ? (
                <div>Loading.....</div>
                    ) : (
                    <AdList
                    ads={ads}
                    onSelect={(ad) => setSelectedAd(ad)}/>  
                    )}
            </div>
    
            <div className='adAndComment bb'>
                <div className='adDescription'>
                    {selectedAd && <AdDescription adContent={selectedAd}/>}
                </div>
                <div className='commentList'>
                    {selectedAd && <CommentList comments={selectedAd}/>}
                </div>
                <div className='addCommnet'></div>
                    {selectedAd && <CommentForm adId = {selectedAd._id}/>}
            </div>    
        </div>
    );
};

export default ViewAd;
