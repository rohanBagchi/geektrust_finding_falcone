import { createAction } from "redux-actions";
import keymirror from "keymirror";

const VehicleDucksActionTypes = keymirror({
    SET_VEHICLES: null
});

const initial_state = {
    vehicles: []
};

export const setVehicles = createAction(
    VehicleDucksActionTypes.SET_VEHICLES,
    (dispatch, vehicles) => ({
        vehicles
    })
);

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case VehicleDucksActionTypes.SET_VEHICLES:
            return { ...state, vehicles: action.payload.vehicles };

        default:
            return state;
    }
}
