import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../CommentList';
import CommentForm from '../CommentForm';

import { QUERY_SINGLE_AD } from '../../utils/queries';

const SingleAd = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { adId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_AD, {
        // pass URL parameter
        variables: { adId: adId },
    });

    const ad = data?.ad || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="my-3">
            <h3 className="card-header bg-dark text-light p-2 m-0">
                {ad.adAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                    had this ad on {ad.createdAt}
                </span>
            </h3>
            <div className="bg-light py-4">
                <blockquote
                    className="p-4"
                    style={{
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        border: '2px dotted #1a1a1a',
                        lineHeight: '1.5',
                    }}
                >
                    {ad.title}
                    {ad.adText}
                </blockquote>
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