import { connect } from 'react-redux';
import VehicleSelector from './VehicleSelector';
import { selectVehicle } from './redux/VehicleDucks'

function mapState(state) {
    return {
        vehicles: state.vehicle_reducer.vehicles,
        form: state.vehicle_reducer.form
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
    const { vehicles, form } = stateProps;
    const { selector } = ownProps;
    const { selected_vehicle } = form[selector];

    const vehicles_with_count = getAvailableVehicles({ vehicles, form });

    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        vehicles: vehicles_with_count,
        selected_vehicle
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
