import reducer, {
    VehicleDucksActionTypes,
    initial_state,
    setVehicles,
    selectVehicle,
    resetVehicleData
} from './VehicleDucks';
import { AppDucksActionTypes } from './AppDucks'

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
        vehicles: [1, 2, 3]
    };

    const action = {
        type: VehicleDucksActionTypes.RESET_VEHICLE_DATA,
        payload: {
            initial_state,
        }
    };

    const state = reducer(existing_state, action);

    const expected = {
        ...initial_state,
        vehicles: existing_state.vehicles
    };

    expect(state).toEqual(expected);
});

it('should set vehicles correctly', () => {
    const vehicles = [1, 2, 3];

    const action = {
        type: VehicleDucksActionTypes.SET_VEHICLES,
        payload: {
            vehicles,
        }
    };

    const state = reducer(null, action);

    expect(state.vehicles).toEqual(vehicles);
});

it('should select vehicle correctly', () => {
    const vehicle = 'foo';
    const selector = FormNames.FORM_1;

    const action = {
        type: VehicleDucksActionTypes.SELECT_VEHICLE,
        payload: {
            vehicle,
            selector
        }
    };

    const state = reducer(null, action);

    expect(state.form[selector]).toEqual({
        selected_vehicle: vehicle
    });
});

/**
 * testing actions
 */

it('should dispatch correct setVehicles action', () => {
    const vehicles = [1, 2, 3];
    const action = setVehicles(null, vehicles);
    const expected = {
        type: VehicleDucksActionTypes.SET_VEHICLES,
        payload: {
            vehicles
        }
    };

    expect(action).toEqual(expected);
});

it('should dispatch correct resetVehicleData action', () => {
    const action = resetVehicleData();
    const expected = {
        type: VehicleDucksActionTypes.RESET_VEHICLE_DATA,
        payload: {
            initial_state
        }
    };

    expect(action).toEqual(expected);
});

it('should dispatch correct selectVehicle action', () => {
    const vehicle = 'bar';
    const selector = FormNames.FORM_1;
    const mockDispatch = jest.fn();
    const action = selectVehicle(mockDispatch, {
        vehicle,
        selector,
        planets_form: {},
        vehicles_form: {},
        planets: [1, 2, 3],
        vehicles: [1, 2, 3],
    });
    const expected = {
        type: VehicleDucksActionTypes.SELECT_VEHICLE,
        payload: {
            vehicle,
            selector
        }
    };

    expect(action).toEqual(expected);
    expect(mockDispatch).toBeCalledWith({
        type: AppDucksActionTypes.APP_DUCKS_SET_TIME_TAKEN,
        payload: {
            time_taken: 0
        }
    })
});
