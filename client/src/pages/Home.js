import React from 'react';
import '..styles/home.css';
import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';
import KitSurf from '../sports/Kitsurf';
import Surfing from '../sports/Surfing';
import SubaDiving from '../sports/SubaDiving';

export default function HomePage() {
  const clickHandler = (sport)=> {
    if(!Auth.loggedIn) {
      return (
        <Link to= './Login'/>
        )
      };
    
    if(sport = 'Kitsurf') {
      return (
        <Link to = './ViewAd'/>
      )
    };

    if(sport = 'Surfing') {
      return (
        <Link to = './ViewAd'/>
      )
    };
    if(sport = 'SubaDiving') {
      return (
        <Link to = './ViewAd'/>
      )
    };
  }
  return (
    <div className='homePage'>
     
        <div className='kitSurf aa' onClick="clickHandler('Kitsurf')">
          <h2>KIT SURF</h2>
            <p>{KitSurf}</p>
          </div>

        <div className='surfing aa' onClick="clickHandler('Surfing')">
          <h2>SURFING</h2>
            <p>{Surfing}</p>          
        </div>

        <div className='subaDiving aa' onClick="clickHandler('SubaDiving')">        
          <h2>SCUB DIVING</h2>
            <p>{SubaDiving}</p>
        </div>
    </div>
  );
}
