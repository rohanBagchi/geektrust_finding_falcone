import {
    getSelectedPlanets,
    getSelectedVehicles,
    getTimeTaken,
    isSubmitButtonEnabled,
    isAllPlanetsSelected,
    isAllVehiclesSelected,
    getAvailablePlanets,
    getNotSelectedPlanets,
    getCurrentSelectedPlanet,
    getAvailableVehicles,
    shouldRenderVehicleSelector,
    getSelectedPlanetFormData,
    getSelectedPlanet
} from './SelectorUtils';

import * as SelectorFns from './SelectorUtils';

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

    const selected_planets = getSelectedPlanets(form);
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

    const selected_vehicles = getSelectedVehicles(form);
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

    const time_taken = getTimeTaken({ selected_planet_names, selected_vehicle_names, planets, vehicles });
    expect(time_taken).toEqual(expected_time_taken);
});

describe('test isSubmitButtonEnabled function', () => {
    const original = {};

    beforeEach(() => {
        original[isAllPlanetsSelected] = SelectorFns.lib.isAllPlanetsSelected;
        original[isAllVehiclesSelected] = SelectorFns.lib.isAllVehiclesSelected;
    });


    it('should correctly compute isSubmitButtonEnabled status for ALL vehicles && ALL planets selected', () => {
        SelectorFns.lib.isAllPlanetsSelected = jest.fn();
        SelectorFns.lib.isAllVehiclesSelected = jest.fn();

        SelectorFns.lib.isAllPlanetsSelected.mockReturnValueOnce(true);
        SelectorFns.lib.isAllVehiclesSelected.mockReturnValueOnce(true);

        expect(SelectorFns.isSubmitButtonEnabled({}, {})).toBeTruthy();
    });

    it('should correctly compute isSubmitButtonEnabled status for ALL planets selected and vehicles NOT selected', () => {
        SelectorFns.lib.isAllPlanetsSelected = jest.fn();
        SelectorFns.lib.isAllVehiclesSelected = jest.fn();

        SelectorFns.lib.isAllPlanetsSelected.mockReturnValueOnce(true);
        SelectorFns.lib.isAllVehiclesSelected.mockReturnValueOnce(false);

        expect(SelectorFns.isSubmitButtonEnabled({}, {})).toBeFalsy();
    });

    it('should correctly compute isSubmitButtonEnabled status for ALL vehicles selected and planets NOT selected', () => {
        SelectorFns.lib.isAllPlanetsSelected = jest.fn();
        SelectorFns.lib.isAllVehiclesSelected = jest.fn();

        SelectorFns.lib.isAllPlanetsSelected.mockReturnValueOnce(false);
        SelectorFns.lib.isAllVehiclesSelected.mockReturnValueOnce(true);

        expect(SelectorFns.isSubmitButtonEnabled({}, {})).toBeFalsy();
    });

    afterEach(() => {
        SelectorFns.lib.isAllPlanetsSelected = original[isAllPlanetsSelected];
        SelectorFns.lib.isAllVehiclesSelected = original[isAllVehiclesSelected];
    });

})

