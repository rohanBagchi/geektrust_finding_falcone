import { createAction } from "redux-actions";
import keymirror from "keymirror";
import {
    fetchInitialAppData as fetchInitialAppDataService,
    findfalcone as findFalconeService
} from './services/AppService';
import { setPlanets, resetPlanetData } from './PlanetDucks';
import { setVehicles, resetVehicleData } from './VehicleDucks';

const AppDucksActionTypes = keymirror({
    APP_DUCKS_FETCH_INITIAL_APP_DATA: null,
    APP_DUCKS_SET_IS_LOADING: null,
    APP_DUCKS_HANDLE_ERROR: null,
    APP_DUCKS_FIND_FALCONE: null,
    APP_DUCKS_SET_FIND_FALCONE_RESPONSE: null,
    APP_DUCKS_SET_TIME_TAKEN: null,
    APP_DUCKS_RESET_ALL: null,
    APP_DUCKS_RESET_APP_DATA: null,
    APP_DUCKS_SET_FIND_FALCONE_FORM_IS_LOADING: null,
});

const initial_state = {
    is_loading: false,
    errors: {},
    has_error: false,
    time_taken: 0,
    find_falcone_response: {
        status: null,
        planet_name: null
    },
    find_falcone_form_is_loading: false
};

export const resetAll = createAction(
    AppDucksActionTypes.APP_DUCKS_RESET_ALL,
    dispatch => {
        dispatch(resetAppData());
        dispatch(resetPlanetData());
        dispatch(resetVehicleData());
    }
);

export const resetAppData = createAction(
    AppDucksActionTypes.APP_DUCKS_RESET_APP_DATA,
    () => ({
        initial_state
    })
);

export const fetchInitialAppData = createAction(
    AppDucksActionTypes.APP_DUCKS_FETCH_INITIAL_APP_DATA,
    dispatch => {
        dispatch(setIsLoading(true));
        fetchInitialAppDataService()
            .then(({ planets, vehicles }) => {
                dispatch(setPlanets(dispatch, planets));
                dispatch(setVehicles(dispatch, vehicles));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(handleError(err));
            })
    }
);

export const setIsLoading = createAction(
    AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING,
    is_loading => ({
        is_loading
    })
);

export const setFindFalconeFormIsLoading = createAction(
    AppDucksActionTypes.APP_DUCKS_SET_FIND_FALCONE_FORM_IS_LOADING,
    is_loading => ({
        is_loading
    })
);

export const setTimeTaken = createAction(
    AppDucksActionTypes.APP_DUCKS_SET_TIME_TAKEN,
    time_taken => ({
        time_taken
    })
);

export const setFindFalconeResponse = createAction(
    AppDucksActionTypes.APP_DUCKS_SET_FIND_FALCONE_RESPONSE,
    find_falcone_response => ({
        find_falcone_response
    })
);

export const handleError = createAction(
    AppDucksActionTypes.APP_DUCKS_HANDLE_ERROR,
    error => ({
        error
    })
);

export const findFalcone = createAction(
    AppDucksActionTypes.APP_DUCKS_FIND_FALCONE,
    (dispatch, planets, vehicles) => {
        dispatch(setFindFalconeFormIsLoading(true));
        return findFalconeService(planets, vehicles)
            .then(response_data => {
                const response = {};
                if (response_data.status === "false") {
                    response.status = false;
                }
                else if (response_data.status === "success") {
                    response.status = true;
                    response.planet_name = response_data.planet_name;
                }

                dispatch(setFindFalconeResponse(response));
                dispatch(setFindFalconeFormIsLoading(false));
            })
            .catch(err => {
                dispatch(handleError(err));
                dispatch(setFindFalconeFormIsLoading(false));
            });
    }
)

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING:
            return {
                ...state,
                is_loading: action.payload.is_loading
            };

        case AppDucksActionTypes.APP_DUCKS_SET_FIND_FALCONE_FORM_IS_LOADING:
            return {
                ...state,
                find_falcone_form_is_loading: action.payload.is_loading
            };

        case AppDucksActionTypes.APP_DUCKS_HANDLE_ERROR:
            return {
                ...state,
                errors: action.payload.errors,
                has_error: !!action.payload.errors
            };

        case AppDucksActionTypes.APP_DUCKS_SET_FIND_FALCONE_RESPONSE:
            return {
                ...state,
                find_falcone_response: action.payload.find_falcone_response
            };

        case AppDucksActionTypes.APP_DUCKS_SET_TIME_TAKEN:
            return {
                ...state,
                time_taken: action.payload.time_taken
            };

        case AppDucksActionTypes.APP_DUCKS_RESET_APP_DATA:
            return {
                ...action.payload.initial_state
            };

        default:
            return state;
    }
}
