import React, { Component } from "react";
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import PlanetSelectorContainer from './PlanetSelectorContainer';
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
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <NavBar />
                        <div className="row">
                            <div className="col-md-12">
                                <h3>
                                    Select the planets you want to search in
                                </h3>
                            </div>
                        </div>
                        {this.renderBody()}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    fetchInitialAppData: PropTypes.func.isRequired,
    errors: PropTypes.object,
    has_error: PropTypes.bool.isRequired,
}

export default App;
