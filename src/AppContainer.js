import { connect } from 'react-redux';
import App from './App';
import { fetchInitialAppData } from './redux/AppDucks'

function mapState(state) {
    return {
        errors: state.app_reducer.errors,
        has_error: state.app_reducer.has_error,
        is_loading: state.app_reducer.is_loading,
        vehicles: state.vehicle_reducer.vehicles,
        planets: state.planet_reducer.planets,
        vehicles_form: state.vehicle_reducer.form,
        planets_form: state.planet_reducer.form,
    }
}

function mapDispatch(dispatch) {
    return {
        fetchInitialAppData: () => dispatch(fetchInitialAppData(dispatch))
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { planets_form, vehicles_form } = stateProps;
    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        is_submit_btn_enabled: isSubmitButtonEnabled(planets_form, vehicles_form)
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
