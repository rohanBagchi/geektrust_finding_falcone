import * as SelectorUtils from './SelectorUtils';

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
    const original = {};

    beforeEach(() => {
        original['isAllPlanetsSelected'] = SelectorUtils.lib.isAllPlanetsSelected;
        original['isAllVehiclesSelected'] = SelectorUtils.lib.isAllVehiclesSelected;
    });


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

    afterEach(() => {
        SelectorUtils.lib.isAllPlanetsSelected = original['isAllPlanetsSelected'];
        SelectorUtils.lib.isAllVehiclesSelected = original['isAllVehiclesSelected'];
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

