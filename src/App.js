import React, { Component } from "react";
import PropTypes from 'prop-types';
import NavBar from './NavBar';
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
                <div className="col-md-12">
                    Hello
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
