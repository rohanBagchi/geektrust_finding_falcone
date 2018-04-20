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

it('should return correct planet from list for getCurrentSelectedPlanet', () => {
    const selected_planet = "foo";
    const foo_planet = {
        name: "foo"
    };

    const planets = [
        foo_planet,
        {
            name: "bar"
        },
        {
            name: "bazz"
        },
    ];

    expect(SelectorUtils.getCurrentSelectedPlanet(planets, selected_planet)).toEqual(foo_planet);
    expect(SelectorUtils.getCurrentSelectedPlanet(planets, "")).toBeUndefined();
});

it('should return vehicles in list for getAvailableVehicles', () => {
    SelectorUtils.lib.getSelectedVehicles = jest.fn();
    SelectorUtils.lib.getSelectedVehicles.mockReturnValueOnce([
        'bar',
        'bazz'
    ]);

    const vehicles = [
        {
            name: 'foo',
            max_distance: 1,
            total_no: 1
        },
        {
            name: 'bar',
            max_distance: 1,
            total_no: 2
        },
        {
            name: 'bazz',
            max_distance: 1,
            total_no: 1
        },
        {
            name: 'fooBarBazz',
            max_distance: 1,
            total_no: 2
        },
    ];

    const expected = [
        {
            name: 'foo',
            max_distance: 1,
            count: 1
        },
        {
            name: 'bar',
            max_distance: 1,
            count: 1 // count updated. original - selected = new count
        },
        {
            name: 'bazz',
            max_distance: 1,
            count: 0 // count updated. original - selected = new count
        },
        {
            name: 'fooBarBazz',
            max_distance: 1,
            count: 2
        },
    ];
    const form = {};
    expect(SelectorUtils.getAvailableVehicles({ vehicles, form })).toEqual(expected);
});

it('should correctly return bool result for shouldRenderVehicleSelector', () => {
    SelectorUtils.lib.getSelectedPlanetFormData = jest.fn();
    SelectorUtils.lib.getSelectedPlanetFormData.mockReturnValueOnce({ selected_planet: 'some planet' });

    expect(SelectorUtils.shouldRenderVehicleSelector()).toBeTruthy();

    SelectorUtils.lib.getSelectedPlanetFormData.mockReturnValueOnce('');

    expect(SelectorUtils.shouldRenderVehicleSelector()).toBeFalsy();
});

it('should correctly return selected planet from form data for getSelectedPlanetFormData', () => {
    const selector = 'Foo';
    const planet_form_data = {
        selected_planet: 'Bar'
    };

    const form = {
        [selector]: planet_form_data
    };
    expect(SelectorUtils.getSelectedPlanetFormData(selector, form)).toEqual(planet_form_data);
});

it('should correctly return list of selected planets for getSelectedPlanet', () => {
    const selector_foo = 'Foo';
    const selector_bar = 'Bar';

    const foobar_planet = {
        name: 'FooBar',
        foo: 'bar',
        some: 'data'
    };

    const planets = [
        foobar_planet,
        {
            name: 'Cluck',
            foo: 'bar',
            some: 'data'
        },
    ];

    const form = {
        [selector_foo]: {
            selected_planet: 'Bar'
        },
        [selector_bar]: {
            selected_planet: 'FooBar'
        },
    };

    SelectorUtils.lib.getSelectedPlanetFormData = jest.fn();
    SelectorUtils.lib.getSelectedPlanetFormData.mockReturnValueOnce({ selected_planet: 'FooBar' });

    expect(SelectorUtils.getSelectedPlanet(selector_foo, form, planets)).toEqual(foobar_planet);
});
