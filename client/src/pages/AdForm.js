import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { ADD_AD } from '../utils/mutations';
import { QUERY_ADS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const AdForm = () => {

    const { sportName } = useParams();

    const { data } = useQuery(QUERY_ADS, {
        // pass URL parameter
        variables: { sportName: sportName },

    });
    console.log(sportName)
    // const ads = data?.ads || {};


    const [title, setTitle] = useState('');
    const [adText, setAdText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addAd, { error }] = useMutation(ADD_AD, {
        update(cache, { data: { addAd } }) {
            try {
                const { ads } = cache.readQuery({ query: QUERY_ADS });

                cache.writeQuery({
                    query: QUERY_ADS,
                    data: { ads: [addAd, ...ads] },
                });
            } catch (e) {
                console.error(e);
            }

            // update me object's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, ads: [...me.ads, addAd] } },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addAd({
                variables: {
                    sportName,
                    title,
                    adText,
                    adAuthor: Auth.getProfile().data.username,
                    email: data.email
                },
            });

            setAdText('');

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'adText' && value.length <= 280) {
            setAdText(value);
            setCharacterCount(value.length);
        } else if (name === 'title') {
            setTitle(value)
        }
    };

    return (
        <div>
            <h3>Post your Ad</h3>

            <>
                <p
                    className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                        }`}
                >
                    Character Count: {characterCount}/280
                </p>
                <form
                    className=" form flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                >
                    <div className="col-12 col-lg-9">
                        <textarea
                            value={title}
                            name="title"
                            onChange={handleChange}
                            placeholder="title of you Ad"
                        ></textarea>
                        <textarea
                            value={adText}
                            name="adText"
                            onChange={handleChange}
                            placeholder="Here's a new thought..."
                        ></textarea>
                    </div>

                    <div className="col-12 col-lg-3">
                        <button className="btn" type="submit">
                            Add your Ad!
                        </button>
                    </div>

                </form>
            </>
        </div>
    );

}
export default AdForm;

