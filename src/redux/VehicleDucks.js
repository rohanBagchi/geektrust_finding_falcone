import { createAction } from "redux-actions";
import keymirror from "keymirror";
import { FormNames } from './PlanetDucks';
import { setTimeTaken } from './AppDucks';
import {
    getSelectedPlanets,
    getSelectedVehicles,
    getTimeTaken
} from '../utils/SelectorUtils';

export const VehicleDucksActionTypes = keymirror({
    SET_VEHICLES: null,
    SELECT_VEHICLE: null,
    RESET_VEHICLE_DATA: null,
});

export const initial_state = {
    vehicles: [],
    form: {
        [FormNames.FORM_1]: getFormData(),
        [FormNames.FORM_2]: getFormData(),
        [FormNames.FORM_3]: getFormData(),
        [FormNames.FORM_4]: getFormData(),
    }
};

export const resetVehicleData = createAction(
    VehicleDucksActionTypes.RESET_VEHICLE_DATA,
    () => ({
        initial_state
    })
);

export const setVehicles = createAction(
    VehicleDucksActionTypes.SET_VEHICLES,
    (dispatch, vehicles) => ({
        vehicles
    })
);

export const _selectVehicle = createAction(
    VehicleDucksActionTypes.SELECT_VEHICLE,
    (dispatch, vehicle, selector) => ({
        vehicle,
        selector
    })
);

export const selectVehicle = createAction(
    VehicleDucksActionTypes.SELECT_VEHICLE,
    (dispatch, data) => {
        const {
            vehicle,
            selector,
            planets_form,
            vehicles_form,
            planets,
            vehicles
        } = data;

        // add -or- update currently selected vehicle to form data.
        const updated_vehicle_form = updateVehicleForm({
            vehicles_form,
            selector,
            chosen_vehicle: vehicle
        });

        const selected_planet_names = getSelectedPlanets(planets_form);
        const selected_vehicle_names = getSelectedVehicles(updated_vehicle_form);

        const time_taken = getTimeTaken({ selected_planet_names, selected_vehicle_names, planets, vehicles });
        dispatch(setTimeTaken(time_taken));

        return {
            vehicle,
            selector
        };
    }
);

export default function reducer(state, action) {
    state = state || initial_state;
    switch (action.type) {
        case VehicleDucksActionTypes.SET_VEHICLES:
            return { ...state, vehicles: action.payload.vehicles };

        case VehicleDucksActionTypes.SELECT_VEHICLE:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.payload.selector]: getFormData(action.payload.vehicle)
                }
            };

        case VehicleDucksActionTypes.RESET_VEHICLE_DATA:
            return {
                ...action.payload.initial_state,
                vehicles: state.vehicles
            };

        default:
            return state;
    }
}

function getFormData(selected_vehicle = '') {
    return {
        selected_vehicle
    }
}

function updateVehicleForm({ vehicles_form, selector, chosen_vehicle }) {
    return {
        ...vehicles_form,
        [selector]: {
            selected_vehicle: chosen_vehicle
        }
    };
}
