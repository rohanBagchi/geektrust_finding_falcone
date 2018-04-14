import { connect } from 'react-redux';
import VehicleSelector from './VehicleSelector';
import { selectVehicle } from './redux/VehicleDucks'

function mapState(state) {
    return {
        planets: state.planet_reducer.planets,
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
    const { vehicles, form, planets_form, planets } = stateProps;
    const { selector } = ownProps;
    const { selected_vehicle } = form[selector];
    const should_render = shouldRenderVehicleSelector(selector, planets_form);
    const selected_planet = getSelectedPlanet(selector, planets_form, planets);

    const vehicles_with_count = getAvailableVehicles({ vehicles, form });

    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        vehicles: vehicles_with_count,
        selected_vehicle,
        should_render,
        selected_planet
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
        for (let i = 0; i < selected_vehicles.length; i++) {
            const selected_vehicle = selected_vehicles[i];
            if (vehicle.name === selected_vehicle) {
                count -= 1;
                selected_vehicles[i] = null;
            }
        }

        return {
            name: vehicle.name,
            max_distance: vehicle.max_distance,
            count,
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
    const { selected_planet } = getSelectedPlanetFormData(selector, planet_form);
    return !!selected_planet;
}

function getSelectedPlanetFormData(selector, planet_form) {
    return planet_form[selector];
}

function getSelectedPlanet(selector, planet_form, planets) {
    const { selected_planet } = getSelectedPlanetFormData(selector, planet_form);
    if (!selected_planet) return;

    return planets.filter(planet => planet.name === selected_planet)[0];
}
