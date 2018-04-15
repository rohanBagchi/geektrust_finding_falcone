import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ status = null, time_taken, planet_found, location }) => {
    if (status === null) {
        return (
            <Redirect to={{
                pathname: '/',
                state: { from: location } // eslint-disable-line react/prop-types
            }} />
        );
    }

    const renderBody = () => {
        if (status) {
            return (

                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                Success! Congratulations on Finding Falcone. King Shan is mighty pleased.
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                Time Taken: {time_taken}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                Planet Found: {planet_found}
                            </div>
                        </div>

                    </div>
                </div>
            );
        }

        return (
            <div className="d-flex justify-content-center">
                Better luck next time!
            </div>
        )
    }
    return (
        <div className="row">
            <div className="col-md-12">
                {renderBody()}
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <button className="btn btn-primary">
                            Start Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
