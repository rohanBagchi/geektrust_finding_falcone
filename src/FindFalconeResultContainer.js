import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import FindFalconeResult from './FindFalconeResult';

function mapState(state) {
    return {
        status: state.app_reducer.find_falcone_response.status,
        planet_found: state.app_reducer.find_falcone_response.planet_name,
        time_taken: state.app_reducer.time_taken,
    }
}

function mapDispatch(dispatch) {
    return {
    }
}

export default withRouter(connect(
    mapState,
    // mapDispatch,
)(FindFalconeResult));
