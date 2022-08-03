import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ adId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addComment({
                variables: {
                    adId,
                    commentText,
                    commentAuthor: Auth.getProfile().data.username,
                },
            });

            setCommentText('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'commentText' && value.length <= 280) {
            setCommentText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
            <h4 className='giveComment'>Please review your experience</h4>

            {Auth.loggedIn() ? (
                <>
                    <p
                        className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                            }`}
                    >
                        Character Count: {characterCount}/280
                        {error && <span className="ml-2">{error.message}</span>}
                    </p>
                    <div className='commentForm'>
                        <form
                            className="flex-row justify-center justify-space-between-md align-center"
                            onSubmit={handleFormSubmit}
                        >
                            <textarea
                                name="commentText"
                                placeholder="Add your review..."
                                value={commentText}
                                className="form-input w-100"
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleChange}
                            ></textarea>

                            <button className="commentButton" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <p>
                    You need to be logged in to share your reviews. Please{' '}
                    <Link className='ls' to="/login">login</Link> or <Link className='ls' to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default CommentForm;
