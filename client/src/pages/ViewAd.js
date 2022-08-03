import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../components/styles/ViewAd.css';

// import AdForm from '../components/AdForm';

import AdList from '../components/AdList';
import SingleAd from '../components/SingleAd';


import { QUERY_SINGLE_SPORT } from '../utils/queries';


export default function ViewAd() {

    const { name } = useParams();
    console.log(name)
    const { loading, data } = useQuery(QUERY_SINGLE_SPORT, {
        // pass URL parameter
        variables: { name: name },
    });
    const sport = data?.sport || {};
    const [adId, setAdId] = useState()
    const handleClick = (adId) => {
        setAdId(adId);
    };

    console.log(sport.name)
    console.log(sport.ads)

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="viewAd">
            <div className=" adTitle bb">
                <h3>{sport.name} ads</h3>
                <div>
                    <AdList
                        ads={sport.ads}
                        handleClick={handleClick}
                    />
                </div>
                <div>
                    <Link
                        className="btn btn-block btn-squared addButton"
                        to={`/form/${sport.name}`}
                    >
                        Post you Ad!
                    </Link>
                </div>
            </div>

            <div className='singleAd bb'>
                {adId && <SingleAd adId={adId} />}
            </div>
           
        </div>

    );
}

