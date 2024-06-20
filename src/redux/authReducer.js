import {
    UPDATE_PROFILE_PICTURE_REQUEST,
    UPDATE_PROFILE_PICTURE_SUCCESS,
    UPDATE_PROFILE_PICTURE_FAILURE,
} from '../actions/userActions';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_PICTURE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_PROFILE_PICTURE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case UPDATE_PROFILE_PICTURE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default authReducer;
