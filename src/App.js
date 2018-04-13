import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import PlanetSelectorContainer from './PlanetSelectorContainer';
import VehicleSelectorContainer from './VehicleSelectorContainer';
import { FormNames } from './redux/PlanetDucks';
import './App.css';

class App extends Component {
    componentWillMount = () => {
        this.props.fetchInitialAppData();
    }

    renderBody = () => {
        if (this.props.has_error) {
            return (
                <div className="alert alert-info" role="alert">
                    Some Error Occured. Please refresh.
                </div>
            );
        }
        return (
            <Fragment>
                <div className="row">
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
                        Time Taken: 0
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
    }

    renderContent = () => {
        if (this.props.is_loading) return <div>Loading..</div>;
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3>
                            Select the planets you want to search in
                        </h3>
                    </div>
                </div>
                {this.renderBody()}
            </Fragment>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <NavBar />
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    fetchInitialAppData: PropTypes.func.isRequired,
    errors: PropTypes.object,
    is_loading: PropTypes.bool.isRequired,
    has_error: PropTypes.bool.isRequired,
}

export default App;
