import { connect } from 'react-redux';
import VehicleSelector from './VehicleSelector';
import { selectVehicle } from './redux/VehicleDucks';
import {
    shouldRenderVehicleSelector,
    getAvailableVehicles,
    getSelectedPlanet,
} from './utils/SelectorUtils'

function mapState(state) {
    return {
        planets: state.planet_reducer.planets,
        vehicles: state.vehicle_reducer.vehicles,
        form: state.vehicle_reducer.form,
        planets_form: state.planet_reducer.form,
        vehicle_form: state.vehicle_reducer.form,
    }
}

function mapDispatch(dispatch) {
    return {
        selectVehicle: (data) =>
            dispatch(
                selectVehicle(dispatch, data)
            ),
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const {
        vehicles,
        form,
        planets_form,
        planets
    } = stateProps;
    const { selector } = ownProps;
    const { selected_vehicle } = form[selector];
    const should_render = shouldRenderVehicleSelector(selector, planets_form);
    const selected_planet = getSelectedPlanet(selector, planets_form, planets);

    const vehicles_with_count = getAvailableVehicles({ vehicles, form });

    const selectVehicle = (vehicle, selector) => {
        const data = {
            vehicle,
            selector,
            planets_form,
            vehicles_form: form,
            planets,
            vehicles
        };

        dispatchProps.selectVehicle(data);
    };

    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        vehicles: vehicles_with_count,
        selected_vehicle,
        should_render,
        selected_planet,
        selectVehicle
    };
}

export default connect(
    mapState,
    mapDispatch,
    mergeProps
)(VehicleSelector);


