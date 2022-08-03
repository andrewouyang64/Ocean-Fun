import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { ADD_AD } from '../utils/mutations';
import { QUERY_ADS, QUERY_SINGLE_SPORT } from '../utils/queries';
import '../components/styles/AdForm.css';
import Auth from '../utils/auth';

const AdForm = () => {
    const navigate = useNavigate()
    const { name: sportName } = useParams();

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
        refetchQueries: [
            {
                query: QUERY_SINGLE_SPORT,
                variables: { name: sportName }
            }
        ]
        // update(cache, { data: { addAd } }) {
        //     try {
        //         const { ads } = cache.readQuery({ query: QUERY_ADS });

        //         cache.writeQuery({
        //             query: QUERY_ADS,
        //             data: { ads: [addAd, ...ads] },
        //         });
        //     } catch (e) {
        //         console.error(e);
        //     }

        //     // update me object's cache
        // },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const profile = Auth.getProfile().data
            const { data } = await addAd({
                variables: {
                    sportName,
                    title,
                    adText,
                    adAuthor: profile.username,
                    email: profile.email
                },
            });

            setAdText('');
            navigate(`/sport/${sportName}`)
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
       
            <div className='newAd'>
                <h3>Post your Ad</h3>        
                <p
                    className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                        }`}
                >
                    Character Count: {characterCount}/280
                </p>
                <div className='adForm'>
                <form className="formcontent" >
               
                   
                        <textarea className='title'
                            value={title}
                            name="title"
                            cols="45"
                            onChange={handleChange}
                            placeholder="title of you Ad"
                        ></textarea><br/><br/>
                        <textarea className='ad'
                            value={adText}
                            name="adText"
                            cols="45"
                            rows="6"
                            onChange={handleChange}
                            placeholder="Here's a new ad..."
                        ></textarea>
                    

                        <button type='button' onClick={handleFormSubmit}>
                            Submit Your Ad
                        </button>
                    

                </form>
                </div>
            </div>
            
        
       
    );

}
export default AdForm;

