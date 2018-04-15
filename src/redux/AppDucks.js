import { createAction } from "redux-actions";
import keymirror from "keymirror";
import {
    fetchInitialAppData as fetchInitialAppDataService,
    findfalcone as findFalconeService
} from './services/AppService';
import { setPlanets } from './PlanetDucks';
import { setVehicles } from './VehicleDucks';

const AppDucksActionTypes = keymirror({
    APP_DUCKS_FETCH_INITIAL_APP_DATA: null,
    APP_DUCKS_SET_IS_LOADING: null,
    APP_DUCKS_HANDLE_ERROR: null,
    APP_DUCKS_FIND_FALCONE: null,
    APP_DUCKS_SET_FIND_FALCONE_RESPONSE: null,
});

const initial_state = {
    is_loading: false,
    errors: {},
    has_error: false,
    find_falcone_response: {
        status: false,
        planet_name: null
    },
};

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
            })
            .catch(err => dispatch(handleError(err)));
    }
)

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING:
            return {
                ...state,
                is_loading: action.payload.is_loading
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

        default:
            return state;
    }
}
