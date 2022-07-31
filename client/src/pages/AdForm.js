import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_AD } from '../../utils/mutations';

const AdForm = ({ userId }) => {
  const [adText, setAdText] = useState('');
  const [title, setTitle] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addNewAd, { error }] = useMutation(ADD_AD);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addNewAd({
        variables: {
          userId,
            adText,
            title,
              // Author: Auth.getProfile().data.username,
              },
              });
            setAdText('');
          setTitle('');
        } 
      catch (err) {
        console.error(err);
        }

      const handleInputChange = (event) => {
        const { name, value } = event.target;
          if (name === 'adText' && value.length <= 300) {
            setAdText(value);
            setCharacterCount(value.length);
            }
          if(name==='title'){
        setTitle(value);
        };
      }
  }

  return (
    <div className='newAd'>
      <h2>Please input your new ad</h2>

          <p className={`m-0 ${
              characterCount === 300 || error ? 'text-danger' : ''
            }`}>         
            Character Count: {characterCount}/300
            {error && <span className="ml-2">{error.message}</span>}
          </p>

          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}>
                                                      
            <div className= "title" >
            Title:<br/>
              <input 
                value={title} 
                    onChange={handleInputChange} 
                      type="title" 
                    size="35" 
                  name="title"
                placeholder="Ad title"/>
            </div>

            <div className=" adContent col-12 col-lg-9 ">
              Ad Content:<br/>
                <textarea
                  name="adText"
                    placeholder="Write your ad here..."
                      value={adText}
                        className="form-input w-100"
                      style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add New Ad
              </button>
            </div>
          </form>
     
    </div>
  );
};

export default AdForm;
