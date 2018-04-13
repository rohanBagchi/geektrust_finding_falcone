import { connect } from 'react-redux';
import App from './App';
import { fetchInitialAppData } from './redux/AppDucks'

function mapState(state) {
    return {
        errors: state.app_reducer.errors,
        has_error: state.app_reducer.has_error,
        vehicles: state.vehicle_reducer.vehicles,
        planets: state.planet_reducer.planets,
    }
}

function mapDispatch(dispatch) {
    return {
        fetchInitialAppData: () => dispatch(fetchInitialAppData(dispatch))
    }
}

export default connect(
    mapState,
    mapDispatch
)(App);
