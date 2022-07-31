import React from 'react';
// comments = [{author: 'author1', {content:'Excellent trainer'}, {createdAt:date}]
const CommentList = ({ comments}) => {
  if (!comments.length) {
    return <h3>No Comment posted Yet</h3>;
  }

  return (
    <div className='commentList'>
      
        {comments.map((item) => (
            <div className='comment'>
              <p>{item.content}</p> <br/>
              <p>commented by:{item.author} on {item.createdAt}</p>

            </div>
        ))}

    </div>
  );
};

export default CommentList;
