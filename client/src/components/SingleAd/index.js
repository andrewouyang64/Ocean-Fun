import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../CommentList';
import CommentForm from '../CommentForm';

import { QUERY_SINGLE_AD } from '../../utils/queries';

const SingleAd = ({ adId }) => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    // const { adId } = useParams();
    console.log(adId)
    const { loading, data } = useQuery(QUERY_SINGLE_AD, {
        // pass URL parameter
        variables: { adId: adId },
    });

    const ad = data?.ad || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="col">
            <h3 className="card-header singAd text-light p-2 m-0">
                {ad.adAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                    had this ad on {ad.createdAt}
                </span>
            </h3>
            <div className="bg-light py-4">
                {/* <blockquote */}
                <p
                    className="p-4 adFont"
                    style={{
                        // fontSize: '1.2rem',
                        fontStyle: 'italic',
                        // border: '2px dotted #1a1a1a',
                        lineHeight: '1.5',
                    }}
                    >
                {/* > */}
                    {ad.title}
                    {ad.adText}
                {/* </blockquote> */}
                </p>
                <h4 className='contact' >contact me at :{ad.email}</h4>
            </div>

            <div className="my-5">
                <CommentList comments={ad.comments} />
            </div>
            <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
                <CommentForm adId={ad._id} />
            </div>
        </div>
    );
};

export default SingleAd;
