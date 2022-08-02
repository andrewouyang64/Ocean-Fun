import React from 'react';
import { Link } from 'react-router-dom';


export default function SportList(props) {
    return (
        <div className="homePage">

            {props.sports.map(sport => (
                <div key={sport.name} className="aa">
                    <Link  to={`/sport/${sport.name}`}>
                        <div >
                           <h2 className='sportName' >{sport.name}</h2>
                            <h3 className='training'>{sport.name} Traning Courses</h3>     
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
};

