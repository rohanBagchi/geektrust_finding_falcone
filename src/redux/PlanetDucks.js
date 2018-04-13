import { createAction } from "redux-actions";
import keymirror from "keymirror";

const PlanetDucksActionTypes = keymirror({
    SET_PLANETS: null
});

const initial_state = {
    planets: []
};

export const setPlanets = createAction(
    PlanetDucksActionTypes.SET_PLANETS,
    (dispatch, planets) => ({
        planets
    })
);

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case PlanetDucksActionTypes.SET_PLANETS:
            return { ...state, planets: action.payload.planets };

        default:
            return state;
    }
}
