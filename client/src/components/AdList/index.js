import React from 'react';

const AdList = ({ ads = [], handleClick }) => {
    if (!ads.length) {
        return <h3>No ads Yet</h3>;
    }
    // const sortedAds = ads.sort
    return (
        <>
            {/* <h3
                className=" display-inline-block"
                style={{ borderBottom: '1px dotted #1a1a1a' }}
            >
                ads
            </h3> */}
            <div className="flex-row my-4">
                {ads &&
                    ads.map((ad) => (
                        <div key={ad._id} className="col-12 mb-3 pb-3">
                            <a

                                href="#home"
                                // onClick={() => handleCardChange('SinlgeAd')}
                                onClick={() => handleClick(ad._id)}

                            >
                                <div className=" adtitle">
                                    <h5 className="card-header">
                                        {ad.adAuthor} posted{' '}
                                        <span style={{ fontSize: '0.825rem' }}>
                                            on {ad.createdAt}
                                        </span>
                                    </h5>
                                    <p className="card-body">{ad.adText}</p>
                                </div>
                            </a>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default AdList;
