import axios from 'axios';

export const UPDATE_PROFILE_PICTURE_REQUEST = 'UPDATE_PROFILE_PICTURE_REQUEST';
export const UPDATE_PROFILE_PICTURE_SUCCESS = 'UPDATE_PROFILE_PICTURE_SUCCESS';
export const UPDATE_PROFILE_PICTURE_FAILURE = 'UPDATE_PROFILE_PICTURE_FAILURE';

export const updateUserProfilePicture = (userId, profilePicture) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_PROFILE_PICTURE_REQUEST });

        try {
            const response = await axios.post(`/api/user/updateProfilePicture`, {
                userId,
                profilePicture,
            });

            dispatch({
                type: UPDATE_PROFILE_PICTURE_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_PICTURE_FAILURE,
                error: error.message,
            });
        }
    };
};
