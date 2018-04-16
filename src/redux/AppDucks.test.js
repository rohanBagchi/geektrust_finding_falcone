import reducer, {
    AppDucksActionTypes,
    initial_state,
    resetAppData,
    setIsLoading,
    setFindFalconeFormIsLoading,
    setTimeTaken,
    setFindFalconeResponse,
    handleError
} from './AppDucks';

/**
 * testing reducers
 */

it('should set initial state correctly', () => {
    const state = reducer(null, {});
    expect(state).toEqual(initial_state);
});

it('should set reset state correctly', () => {
    const action = {
        type: AppDucksActionTypes.APP_DUCKS_RESET_APP_DATA,
        payload: {
            initial_state
        }
    };
    const state = reducer(null, action);
    expect(state).toEqual(initial_state);
});

it('should set is_loading', () => {
    const is_loading = 'foo';
    const action = {
        type: AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING,
        payload: {
            is_loading
        }
    };
    const state = reducer(null, action);
    expect(state.is_loading).toEqual(is_loading);
});

it('should set falcone form is_loading', () => {
    const is_loading = 'foo';
    const action = {
        type: AppDucksActionTypes.APP_DUCKS_SET_FIND_FALCONE_FORM_IS_LOADING,
        payload: {
            is_loading
        }
    };
    const state = reducer(null, action);
    expect(state.find_falcone_form_is_loading).toEqual(is_loading);
});

it('should correctly handle errors', () => {
    const errors = 'foo';
    const action = {
        type: AppDucksActionTypes.APP_DUCKS_HANDLE_ERROR,
        payload: {
            errors
        }
    };
    const state = reducer(null, action);
    expect(state.errors).toEqual(errors);
    expect(state.has_error).toEqual(true);
});

it('should set find falcone response', () => {
    const find_falcone_response = 'foo';
    const action = {
        type: AppDucksActionTypes.APP_DUCKS_SET_FIND_FALCONE_RESPONSE,
        payload: {
            find_falcone_response
        }
    };
    const state = reducer(null, action);
    expect(state.find_falcone_response).toEqual(find_falcone_response);
});

it('should set time taken', () => {
    const time_taken = 'foo';
    const action = {
        type: AppDucksActionTypes.APP_DUCKS_SET_TIME_TAKEN,
        payload: {
            time_taken
        }
    };
    const state = reducer(null, action);
    expect(state.time_taken).toEqual(time_taken);
});

/**
 * testing action creators
 */

it('should dispatch correct resetAppData action', () => {
    const action = resetAppData();
    const expected = {
        type: AppDucksActionTypes.APP_DUCKS_RESET_APP_DATA,
        payload: {
            initial_state
        }
    };
    expect(action).toEqual(expected);
});

it('should dispatch correct setIsLoading action', () => {
    const is_loading = 'foo';
    const action = setIsLoading(is_loading);
    const expected = {
        type: AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING,
        payload: {
            is_loading
        }
    };
    expect(action).toEqual(expected);
});

it('should dispatch correct setFindFalconeFormIsLoading action', () => {
    const is_loading = 'foo';
    const action = setFindFalconeFormIsLoading(is_loading);
    const expected = {
        type: AppDucksActionTypes.APP_DUCKS_SET_FIND_FALCONE_FORM_IS_LOADING,
        payload: {
            is_loading
        }
    };
    expect(action).toEqual(expected);
});

it('should dispatch correct setTimeTaken action', () => {
    const time_taken = 'foo';
    const action = setTimeTaken(time_taken);
    const expected = {
        type: AppDucksActionTypes.APP_DUCKS_SET_TIME_TAKEN,
        payload: {
            time_taken
        }
    };
    expect(action).toEqual(expected);
});

it('should dispatch correct setFindFalconeResponse action', () => {
    const find_falcone_response = 'foo';
    const action = setFindFalconeResponse(find_falcone_response);
    const expected = {
        type: AppDucksActionTypes.APP_DUCKS_SET_FIND_FALCONE_RESPONSE,
        payload: {
            find_falcone_response
        }
    };
    expect(action).toEqual(expected);
});

it('should dispatch correct handleError action', () => {
    const error = 'foo';
    const action = handleError(error);
    const expected = {
        type: AppDucksActionTypes.APP_DUCKS_HANDLE_ERROR,
        payload: {
            error
        }
    };
    expect(action).toEqual(expected);
});
