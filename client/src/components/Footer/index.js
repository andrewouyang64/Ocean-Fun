import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '.'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer><br/> <br></br>
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="footerButton mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className='copyRight'  >&copy; {new Date().getFullYear()} - by Alicia, Andrew, Ken and Glen</h4>
      </div>
    </footer>
  );
};

export default Footer;
