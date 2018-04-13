import { createAction } from "redux-actions";
import keymirror from "keymirror";
import { FormNames } from './PlanetDucks'

const VehicleDucksActionTypes = keymirror({
    SET_VEHICLES: null,
    SELECT_VEHICLE: null,
});

const initial_state = {
    vehicles: [],
    form: {
        [FormNames.FORM_1]: getFormData(),
        [FormNames.FORM_2]: getFormData(),
        [FormNames.FORM_3]: getFormData(),
        [FormNames.FORM_4]: getFormData(),
    }
};

export const setVehicles = createAction(
    VehicleDucksActionTypes.SET_VEHICLES,
    (dispatch, vehicles) => ({
        vehicles
    })
);

export const selectVehicle = createAction(
    VehicleDucksActionTypes.SELECT_VEHICLE,
    (dispatch, vehicle, selector) => ({
        vehicle,
        selector
    })
);

export default function reducer(state = initial_state, action) {
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

        default:
            return state;
    }
}

function getFormData(selected_vehicle = '') {
    return {
        selected_vehicle
    }
}
