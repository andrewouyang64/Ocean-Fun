import React from 'react';
import { Link } from 'react-router-dom';


export default function SportList(props) {
    return (
        <div className="homePage">

            {props.sports.map(sport => (
                <div key={sport.name} id={sport.name} className="aa">
                    <Link  to={`/sport/${sport.name}`}>
                        <div >
                           <h3 className='sportName' >{sport.name}</h3>
                            <h4 className='training'>Traning Courses</h4>     
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
};

