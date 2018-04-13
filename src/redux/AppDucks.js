import { createAction } from "redux-actions";
import keymirror from "keymirror";

const AppDucksActionTypes = keymirror({
    FETCH_INITIAL_APP_DATA: null,
    APP_DUCKS_SET_IS_LOADING: null
});

const initial_state = {
    is_loading: true
};

export const fetchInitialAppData = createAction(
    AppDucksActionTypes.FETCH_INITIAL_APP_DATA,
    dispatch => ({})
);

export const setIsLoading = createAction(
    AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING,
    is_loading => ({
        is_loading
    })
);

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case AppDucksActionTypes.APP_DUCKS_SET_IS_LOADING:
            return { ...state, is_loading: action.payload.is_loading };

        default:
            return state;
    }
}
