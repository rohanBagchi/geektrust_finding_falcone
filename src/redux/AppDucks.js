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
    APP_DUCKS_HANDLE_INITIAL_LOAD_ERROR: null,
    APP_DUCKS_FIND_FALCONE: null,
});

const initial_state = {
    is_loading: false,
    errors: {},
    has_error: false
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
                dispatch(handleInitialLoadError(err));
            })
    }
);

export const setIsLoading = createAction(
    AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING,
    is_loading => ({
        is_loading
    })
);

export const handleInitialLoadError = createAction(
    AppDucksActionTypes.APP_DUCKS_HANDLE_INITIAL_LOAD_ERROR,
    error => ({
        error
    })
);

export const findFalcone = createAction(
    AppDucksActionTypes.APP_DUCKS_FIND_FALCONE,
    (dispatch, planets, vehicles) => {
        return findFalconeService(planets, vehicles)
            .then(res => {

            })
    }
)

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING:
            return {
                ...state,
                is_loading: action.payload.is_loading
            };

        case AppDucksActionTypes.APP_DUCKS_HANDLE_INITIAL_LOAD_ERROR:
            return {
                ...state,
                errors: action.payload.errors,
                has_error: !!action.payload.errors
            };

        default:
            return state;
    }
}
