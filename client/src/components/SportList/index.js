import React from 'react';
import { Link } from 'react-router-dom';


export default function SportList(props) {
    return (
        <div className="homePage">

            {props.sports.map(sport => (
                <div key={sport.name} id={sport.name} className='aa'>
                    <Link className='aaa' to={`/sport/${sport.name}`}>
                           <h3 className='sportName' >{sport.name}</h3>
                            <span className='training'>training course</span>     
                    </Link>
                </div>
            ))}
        </div>
    )
};

