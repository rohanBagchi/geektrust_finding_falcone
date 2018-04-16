import reducer, {
    initial_state,
    PlanetDucksActionTypes,
    setPlanets,
    resetPlanetData,
    selectPlanet,
} from './PlanetDucks';
import { FormNames } from './PlanetDucks'

/**
 * testing reducer
 */

it('should set default state correctly', () => {
    expect(reducer(null, {})).toEqual(initial_state);
});

it('should reset state correctly', () => {
    const existing_state = {
        form: {
            [FormNames.FORM_1]: 1,
            [FormNames.FORM_2]: 2,
            [FormNames.FORM_3]: 3,
            [FormNames.FORM_4]: 4,
        },
        planets: [1, 2, 3]
    };

    const action = {
        type: PlanetDucksActionTypes.RESET_PLANET_DATA,
        payload: {
            initial_state,
        }
    };

    const state = reducer(existing_state, action);

    const expected = {
        ...initial_state,
        planets: existing_state.planets
    };

    expect(state).toEqual(expected);
});

it('should set planets correctly', () => {
    const planets = [1, 2, 3];

    const action = {
        type: PlanetDucksActionTypes.SET_PLANETS,
        payload: {
            planets,
        }
    };

    const state = reducer(null, action);

    expect(state.planets).toEqual(planets);
});

it('should select planet correctly', () => {
    const planet = 'foo';
    const selector = FormNames.FORM_1;

    const action = {
        type: PlanetDucksActionTypes.SELECT_PLANET,
        payload: {
            planet,
            selector
        }
    };

    const state = reducer(null, action);

    expect(state.form[selector]).toEqual({
        selected_planet: planet
    });
});

/**
 * testing actions
 */

it('should dispatch correct setPlanets action', () => {
    const planets = [1, 2, 3];
    const action = setPlanets(null, planets);
    const expected = {
        type: PlanetDucksActionTypes.SET_PLANETS,
        payload: {
            planets
        }
    };

    expect(action).toEqual(expected);
});

it('should dispatch correct resetPlanetData action', () => {
    const action = resetPlanetData();
    const expected = {
        type: PlanetDucksActionTypes.RESET_PLANET_DATA,
        payload: {
            initial_state
        }
    };

    expect(action).toEqual(expected);
});

it('should dispatch correct selectPlanet action', () => {
    const planet = 'bar';
    const selector = FormNames.FORM_1;
    const action = selectPlanet(null, planet, selector);
    const expected = {
        type: PlanetDucksActionTypes.SELECT_PLANET,
        payload: {
            planet,
            selector
        }
    };

    expect(action).toEqual(expected);
});
