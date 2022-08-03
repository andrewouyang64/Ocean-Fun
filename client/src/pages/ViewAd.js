import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className=" row card-body">
            <div className=" col">
                <h3>{sport.name}</h3>

                <div>
                    <AdList
                        ads={sport.ads}
                        handleClick={handleClick}
                    />
                </div>
                <div>
                    <Link
                        className="btn btn-primary btn-block btn-squared"
                        to={`/form/${sport.name}`}
                    >
                        Post you Ad!
                    </Link>
                </div>
                {adId && <SingleAd adId={adId} />}
            </div>
        </div>

    );
}

