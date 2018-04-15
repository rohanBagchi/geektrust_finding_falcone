import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import App from './App';
import { fetchInitialAppData, findFalcone } from './redux/AppDucks';
import {
    getSelectedPlanets,
    getSelectedVehicles,
    isSubmitButtonEnabled
} from './utils/SelectorUtils';

function mapState(state) {
    return {
        errors: state.app_reducer.errors,
        has_error: state.app_reducer.has_error,
        is_loading: state.app_reducer.is_loading,
        time_taken: state.app_reducer.time_taken,
        vehicles: state.vehicle_reducer.vehicles,
        planets: state.planet_reducer.planets,
        vehicles_form: state.vehicle_reducer.form,
        planets_form: state.planet_reducer.form,
    }
}

function mapDispatch(dispatch) {
    return {
        fetchInitialAppData: () => dispatch(fetchInitialAppData(dispatch)),
        findFalcone: (planets, vehicles) => dispatch(findFalcone(dispatch, planets, vehicles)),
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { planets_form, vehicles_form, planets, vehicles } = stateProps;

    const findFalcone = () => {
        const planets = getSelectedPlanets(planets_form);
        const vehicles = getSelectedVehicles(vehicles_form);
        dispatchProps.findFalcone(planets, vehicles);
    };

    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        is_submit_btn_enabled: isSubmitButtonEnabled(planets_form, vehicles_form),
        findFalcone
    };
}

export default withRouter(
    connect(
        mapState,
        mapDispatch,
        mergeProps
    )(App)
);

