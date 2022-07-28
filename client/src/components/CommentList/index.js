import React from 'react';

const CommentList = ({ comments,}) => {
  if (!comments.length) {
    return <h3>No Comment posted Yet</h3>;
  }

  return (
    <div className='commentList'>
      
        {comments.map((comment) => (
            <div className='comment'>
                {comment}
            </div>
        ))}

    </div>
  );
};

export default CommentList;
