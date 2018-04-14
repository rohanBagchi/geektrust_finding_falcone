import { connect } from 'react-redux';
import VehicleSelector from './VehicleSelector';
import { selectVehicle } from './redux/VehicleDucks'

function mapState(state) {
    return {
        vehicles: state.vehicle_reducer.vehicles,
        form: state.vehicle_reducer.form,
        planets_form: state.planet_reducer.form,
    }
}

function mapDispatch(dispatch) {
    return {
        selectVehicle: (vehicle, selector) =>
            dispatch(
                selectVehicle(dispatch, vehicle, selector)
            ),
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { vehicles, form, planets_form } = stateProps;
    const { selector } = ownProps;
    const { selected_vehicle } = form[selector];
    const should_render = shouldRenderVehicleSelector(selector, planets_form);

    const vehicles_with_count = getAvailableVehicles({ vehicles, form });

    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        vehicles: vehicles_with_count,
        selected_vehicle,
        should_render
    };
}

export default connect(
    mapState,
    mapDispatch,
    mergeProps
)(VehicleSelector);

function getAvailableVehicles({ vehicles, form }) {
    const selected_vehicles = getSelectedVehicles(form);
    return vehicles.map(vehicle => {
        let count = vehicle.total_no;
        const selected_vehicle_index = selected_vehicles.indexOf(vehicle.name);

        for (let i = 0; i < selected_vehicles.length; i++) {
            const selected_vehicle = selected_vehicles[i];
            if (vehicle.name === selected_vehicle) {
                count -= 1;
                selected_vehicles[i] = null;
            }
        }

        return {
            name: vehicle.name,
            count
        };
    });
}

function getSelectedVehicles(form) {
    const selected_vehicles = [];
    Object.keys(form).forEach(selector => {
        const { selected_vehicle } = form[selector];
        selected_vehicle && selected_vehicles.push(selected_vehicle);
    });
    return selected_vehicles;
}

function shouldRenderVehicleSelector(selector, planet_form) {
    const { selected_planet } = planet_form[selector];
    return !!selected_planet;
}
