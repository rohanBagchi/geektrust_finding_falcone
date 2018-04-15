import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import './App.css';

class App extends Component {
    componentWillMount = () => {
        this.props.fetchInitialAppData();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <NavBar />
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    fetchInitialAppData: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default App;
