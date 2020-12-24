// initialState
export const initialState = {
    shows: [],
    loading: false,
    error: undefined,
};

// Reducer
export const showsReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_STARTED":
            return { ...state, loading: true, error: undefined };
        case "FETCH_SUCCESSFUL":
            return { ...state, shows: [...state.shows, ...action.payload], loading: false };
        case "FETCH_FAILED":
            return { ...state, error: action.payload, loading: false };
        case "RESET_SHOWS":
            return { ...state, shows: [] };
        default:
            return state;
    }
};
