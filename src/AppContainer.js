import { connect } from 'react-redux';
import App from './App';
import { fetchInitialAppData, findFalcone } from './redux/AppDucks';
import { getSelectedPlanets } from './PlanetSelectorContainer';
import { getSelectedVehicles } from './VehicleSelectorContainer';

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

export default connect(
    mapState,
    mapDispatch,
    mergeProps
)(App);

function isSubmitButtonEnabled(planets_form, vehicles_form) {
    return isAllPlanetsSelected(planets_form) && isAllVehiclesSelected(vehicles_form);
}

function isAllPlanetsSelected(planets_form) {
    const form_keys = Object.keys(planets_form);

    for (let i = 0; i < form_keys.length; i++) {
        const selector = form_keys[i];
        const { selected_planet } = planets_form[selector];
        if (!selected_planet) return false;
    }
    return true;
}

function isAllVehiclesSelected(vehicles_form) {
    const form_keys = Object.keys(vehicles_form);

    for (let i = 0; i < form_keys.length; i++) {
        const selector = form_keys[i];
        const { selected_vehicle } = vehicles_form[selector];
        if (!selected_vehicle) return false;
    }
    return true;
}
