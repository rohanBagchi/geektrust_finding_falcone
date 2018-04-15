import { createAction } from "redux-actions";
import keymirror from "keymirror";

const PlanetDucksActionTypes = keymirror({
    SET_PLANETS: null,
    SELECT_PLANET: null,
    RESET_PLANET_DATA: null
});

export const FormNames = keymirror({
    FORM_1: null,
    FORM_2: null,
    FORM_3: null,
    FORM_4: null,
});

const initial_state = {
    planets: [],
    form: {
        [FormNames.FORM_1]: getFormData(),
        [FormNames.FORM_2]: getFormData(),
        [FormNames.FORM_3]: getFormData(),
        [FormNames.FORM_4]: getFormData(),
    }
};

export const resetPlanetData = createAction(
    PlanetDucksActionTypes.RESET_PLANET_DATA,
    () => ({
        initial_state
    })
);

export const setPlanets = createAction(
    PlanetDucksActionTypes.SET_PLANETS,
    (dispatch, planets) => ({
        planets
    })
);

export const selectPlanet = createAction(
    PlanetDucksActionTypes.SELECT_PLANET,
    (dispatch, planet, selector) => ({
        planet,
        selector
    })
);

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case PlanetDucksActionTypes.SET_PLANETS:
            return {
                ...state,
                planets: action.payload.planets
            };
        case PlanetDucksActionTypes.SELECT_PLANET:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.payload.selector]: getFormData(action.payload.planet)
                }
            };

        case PlanetDucksActionTypes.RESET_PLANET_DATA:
            return {
                ...action.payload.initial_state,
                planets: state.planets
            };

        default:
            return state;
    }
}

function getFormData(selected_planet = '') {
    return {
        selected_planet
    }
}
