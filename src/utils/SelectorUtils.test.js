import * as SelectorUtils from './SelectorUtils';

const original = {};

beforeEach(() => {
    original['isAllPlanetsSelected'] = SelectorUtils.lib.isAllPlanetsSelected;
    original['isAllVehiclesSelected'] = SelectorUtils.lib.isAllVehiclesSelected;
    original['getNotSelectedPlanets'] = SelectorUtils.lib.getNotSelectedPlanets;
    original['getCurrentSelectedPlanet'] = SelectorUtils.lib.getCurrentSelectedPlanet;
    original['getSelectedPlanets'] = SelectorUtils.lib.getSelectedPlanets;
});

afterEach(() => {
    SelectorUtils.lib.isAllPlanetsSelected = original['isAllPlanetsSelected'];
    SelectorUtils.lib.isAllVehiclesSelected = original['isAllVehiclesSelected'];
    SelectorUtils.lib.getNotSelectedPlanets = original['getNotSelectedPlanets'];
    SelectorUtils.lib.getCurrentSelectedPlanet = original['getCurrentSelectedPlanet'];
    SelectorUtils.lib.getSelectedPlanets = original['getSelectedPlanets'];
});

it('should return selected planets', () => {
    const selected_planet_1 = 'foo01';
    const selected_planet_2 = 'foo02';
    const form = {
        foo: {
            selected_planet: selected_planet_1
        },
        bar: {
            selected_planet: selected_planet_2
        },
    };

    const selected_planets = SelectorUtils.getSelectedPlanets(form);
    expect(selected_planets).toEqual([
        selected_planet_1,
        selected_planet_2
    ]);
});

it('should return selected vehicles', () => {
    const selected_vehicle_1 = 'foo01';
    const selected_vehicle_2 = 'foo02';
    const form = {
        foo: {
            selected_vehicle: selected_vehicle_1
        },
        bar: {
            selected_vehicle: selected_vehicle_2
        },
    };

    const selected_vehicles = SelectorUtils.getSelectedVehicles(form);
    expect(selected_vehicles).toEqual([
        selected_vehicle_1,
        selected_vehicle_2
    ]);
});

it('should return time taken', () => {
    const selected_planet_1 = 'foo01';
    const selected_planet_2 = 'foo02';

    const selected_vehicle_1 = 'foo01';
    const selected_vehicle_2 = 'foo02';

    const selected_planet_1_distance = 10;
    const selected_planet_2_distance = 20;

    const selected_vehicle_1_speed = 2;
    const selected_vehicle_2_speed = 5;

    const planets = [
        {
            name: selected_planet_1,
            distance: selected_planet_1_distance
        },
        {
            name: selected_planet_2,
            distance: selected_planet_2_distance
        },
        {
            name: 'Random Planet',
            distance: 30
        },
    ];

    const vehicles = [
        {
            name: selected_vehicle_1,
            speed: selected_vehicle_1_speed
        },
        {
            name: selected_vehicle_2,
            speed: selected_vehicle_2_speed
        },
        {
            name: 'Random Vehicle',
            speed: 10
        },
    ];

    const expected_time_taken = ((selected_planet_1_distance / selected_vehicle_1_speed) + (selected_planet_2_distance / selected_vehicle_2_speed));

    const selected_planet_names = [
        selected_planet_1,
        selected_planet_2
    ];

    const selected_vehicle_names = [
        selected_vehicle_1,
        selected_vehicle_2
    ];

    const time_taken = SelectorUtils.getTimeTaken({ selected_planet_names, selected_vehicle_names, planets, vehicles });
    expect(time_taken).toEqual(expected_time_taken);
});

describe('test isSubmitButtonEnabled function', () => {
    it('should correctly compute isSubmitButtonEnabled status for ALL vehicles && ALL planets selected', () => {
        SelectorUtils.lib.isAllPlanetsSelected = jest.fn();
        SelectorUtils.lib.isAllVehiclesSelected = jest.fn();

        SelectorUtils.lib.isAllPlanetsSelected.mockReturnValueOnce(true);
        SelectorUtils.lib.isAllVehiclesSelected.mockReturnValueOnce(true);

        expect(SelectorUtils.isSubmitButtonEnabled({}, {})).toBeTruthy();
    });

    it('should correctly compute isSubmitButtonEnabled status for ALL planets selected and vehicles NOT selected', () => {
        SelectorUtils.lib.isAllPlanetsSelected = jest.fn();
        SelectorUtils.lib.isAllVehiclesSelected = jest.fn();

        SelectorUtils.lib.isAllPlanetsSelected.mockReturnValueOnce(true);
        SelectorUtils.lib.isAllVehiclesSelected.mockReturnValueOnce(false);

        expect(SelectorUtils.isSubmitButtonEnabled({}, {})).toBeFalsy();
    });

    it('should correctly compute isSubmitButtonEnabled status for ALL vehicles selected and planets NOT selected', () => {
        SelectorUtils.lib.isAllPlanetsSelected = jest.fn();
        SelectorUtils.lib.isAllVehiclesSelected = jest.fn();

        SelectorUtils.lib.isAllPlanetsSelected.mockReturnValueOnce(false);
        SelectorUtils.lib.isAllVehiclesSelected.mockReturnValueOnce(true);

        expect(SelectorUtils.isSubmitButtonEnabled({}, {})).toBeFalsy();
    });
});

it('should correctly return TRUE for isAllPlanetsSelected', () => {
    const selected_planet_1 = 'foo01';
    const selected_planet_2 = 'foo02';
    const form = {
        foo: {
            selected_planet: selected_planet_1
        },
        bar: {
            selected_planet: selected_planet_2
        },
    };

    const is_all_planets_selected = SelectorUtils.isAllPlanetsSelected(form);
    expect(is_all_planets_selected).toBeTruthy();
});

it('should correctly return FALSE for isAllPlanetsSelected', () => {
    const selected_planet_1 = 'foo01';
    const selected_planet_2 = 'foo02';
    const form = {
        foo: {
            selected_planet: selected_planet_1
        },
        bar: {
            selected_planet: ''
        },
    };

    const is_all_planets_selected = SelectorUtils.isAllPlanetsSelected(form);
    expect(is_all_planets_selected).toBeFalsy();
});

it('should correctly return TRUE for isAllVehiclesSelected', () => {
    const selected_vehicle_1 = 'foo01';
    const selected_vehicle_2 = 'foo02';
    const form = {
        foo: {
            selected_vehicle: selected_vehicle_1
        },
        bar: {
            selected_vehicle: selected_vehicle_2
        },
    };

    const is_all_planets_selected = SelectorUtils.isAllVehiclesSelected(form);
    expect(is_all_planets_selected).toBeTruthy();
});

it('should correctly return FALSE for isAllVehiclesSelected', () => {
    const selected_vehicle_1 = 'foo01';
    const selected_vehicle_2 = 'foo02';
    const form = {
        foo: {
            selected_vehicle: selected_vehicle_1
        },
        bar: {
            selected_vehicle: ''
        },
    };


    const is_all_planets_selected = SelectorUtils.isAllVehiclesSelected(form);
    expect(is_all_planets_selected).toBeFalsy();
});

it('should correctly compute available planets for a currently selected planet', () => {
    SelectorUtils.lib.getNotSelectedPlanets = jest.fn();
    SelectorUtils.lib.getCurrentSelectedPlanet = jest.fn();

    const not_selected_planets = [1, 2, 3];
    const current_selected_planet = 'foo';

    const expected_available_planets = [...not_selected_planets, current_selected_planet];

    SelectorUtils.lib.getNotSelectedPlanets.mockReturnValueOnce(not_selected_planets);
    SelectorUtils.lib.getCurrentSelectedPlanet.mockReturnValueOnce(current_selected_planet);

    /**
     * called with an empty object for 2 reasons:
     * 1. getAvailablePlanets destructures the received data
     * 2. getAvailablePlanets orchestrates `getNotSelectedPlanets` & `getCurrentSelectedPlanet`. Both have been mocked.
     */
    expect(SelectorUtils.getAvailablePlanets({})).toEqual(expected_available_planets);
});

it('should correctly compute available planets for no currently selected planet', () => {
    SelectorUtils.lib.getNotSelectedPlanets = jest.fn();
    SelectorUtils.lib.getCurrentSelectedPlanet = jest.fn();

    const not_selected_planets = [1, 2, 3];
    const current_selected_planet = null;

    const expected_available_planets = [...not_selected_planets];

    SelectorUtils.lib.getNotSelectedPlanets.mockReturnValueOnce(not_selected_planets);
    SelectorUtils.lib.getCurrentSelectedPlanet.mockReturnValueOnce(current_selected_planet);

    /**
     * called with an empty object for 2 reasons:
     * 1. getAvailablePlanets destructures the received data
     * 2. getAvailablePlanets orchestrates `getNotSelectedPlanets` & `getCurrentSelectedPlanet`. Both have been mocked.
     */
    expect(SelectorUtils.getAvailablePlanets({})).toEqual(expected_available_planets);
});

it('should return ONE planet in list for getNotSelectedPlanets', () => {
    SelectorUtils.lib.getSelectedPlanets = jest.fn();

    const selected_planets = [1, 2, 3];
    const planets = [
        {
            name: 1
        },
        {
            name: 2
        },
        {
            name: 3
        },
        {
            name: 4
        },
    ];

    SelectorUtils.lib.getSelectedPlanets.mockReturnValueOnce(selected_planets);

    expect(SelectorUtils.getNotSelectedPlanets(planets)).toEqual([
        {
            name: 4
        }
    ]);
});

it('should return ZERO planets in list for getNotSelectedPlanets', () => {
    SelectorUtils.lib.getSelectedPlanets = jest.fn();

    const selected_planets = [1, 2, 3];
    const planets = [
        {
            name: 1
        },
        {
            name: 2
        },
        {
            name: 3
        },
    ];

    SelectorUtils.lib.getSelectedPlanets.mockReturnValueOnce(selected_planets);

    expect(SelectorUtils.getNotSelectedPlanets(planets)).toEqual([]);
});
