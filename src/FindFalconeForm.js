import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PlanetSelectorContainer from './PlanetSelectorContainer';
import VehicleSelectorContainer from './VehicleSelectorContainer';
import { FormNames } from './redux/PlanetDucks';

export default function FindFalconeForm({ is_loading, find_falcone_form_is_loading, has_error, time_taken, is_submit_btn_enabled, status, findFalcone }) {
    if (status !== null) {
        return (
            <Redirect to={{
                pathname: '/result',
                state: { from: '' } // eslint-disable-line react/prop-types
            }} />
        );
    }

    if (has_error) {
        return (
            <div className="alert alert-info" role="alert">
                Some Error Occured. Please refresh.
            </div>
        );
    }

    if (is_loading) return <div>Loading..</div>;

    const renderBody = () => {
        return (
            <Fragment>
                <div className="row mb-2">
                    <div className="col-md-2">
                        <PlanetSelectorContainer selector={FormNames.FORM_1} />
                    </div>
                    <div className="col-md-2">
                        <PlanetSelectorContainer selector={FormNames.FORM_2} />
                    </div>
                    <div className="col-md-2">
                        <PlanetSelectorContainer selector={FormNames.FORM_3} />
                    </div>
                    <div className="col-md-2">
                        <PlanetSelectorContainer selector={FormNames.FORM_4} />
                    </div>
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        Time Taken: {time_taken}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <VehicleSelectorContainer selector={FormNames.FORM_1} />
                    </div>
                    <div className="col-md-2">
                        <VehicleSelectorContainer selector={FormNames.FORM_2} />
                    </div>
                    <div className="col-md-2">
                        <VehicleSelectorContainer selector={FormNames.FORM_3} />
                    </div>
                    <div className="col-md-2">
                        <VehicleSelectorContainer selector={FormNames.FORM_4} />
                    </div>
                </div>
            </Fragment>
        );
    };

    const handleSubmitBtnClick = () => {
        if (!is_submit_btn_enabled) return;
        findFalcone();
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <h3>
                        Select the planets you want to search in
                    </h3>
                </div>
            </div>
            {renderBody()}
            <div className="row">
                <div className="col-md-10 d-flex justify-content-center mt-4">
                    <button
                        onClick={handleSubmitBtnClick}
                        type="button"
                        className="btn btn-primary"
                        disabled={!is_submit_btn_enabled || find_falcone_form_is_loading}>
                        {
                            find_falcone_form_is_loading ? 'Loading...' : 'Find Falcone'
                        }
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

FindFalconeForm.propTypes = {
    is_loading: PropTypes.bool.isRequired,
    has_error: PropTypes.bool.isRequired,
    find_falcone_form_is_loading: PropTypes.bool.isRequired,
    is_submit_btn_enabled: PropTypes.bool.isRequired,
    time_taken: PropTypes.number.isRequired,
    status: PropTypes.any,
    findFalcone: PropTypes.func.isRequired,
};
