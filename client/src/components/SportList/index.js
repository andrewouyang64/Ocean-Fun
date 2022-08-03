import React from 'react';
import { Link } from 'react-router-dom';


export default function SportList(props) {
    return (
        <div className="row">

            {props.sports.map(sport => (

                <div key={sport.name} className="col-12">
                    <Link className="btn btn-lg btn-light m-2" to={`/sport/${sport.name}`}>
                        <div className="col-sm-6 d-flex justify-content-center">
                            {/* <div className="card"> */}
                            <div className="card-body">
                                {/* <img src="..." class="card-img" alt="..."> */}
                                <div className="card-img-overlay">
                                    <h5 className="card-title">${sport.name}</h5>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
};

