import { connect } from 'react-redux';
import FindFalconeResult from './FindFalconeResult';

function mapState(state) {
    return {
        status: state.app_reducer.find_falcone_response.status,
        planet_found: state.app_reducer.find_falcone_response.planet_name,
    }
}

function mapDispatch(dispatch) {
    return {
        findFalcone: (planets, vehicles) => dispatch(findFalcone(dispatch, planets, vehicles)),
    }
}

export default connect(
    mapState,
    mapDispatch,
)(FindFalconeResult);
