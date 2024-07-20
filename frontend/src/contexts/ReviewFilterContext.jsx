import { createContext, useReducer } from "react";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

export const ReviewFilterContext = createContext();

const initialState = {
    minUsefulness: { value: 1, label: "1" },
    maxUsefulness: { value: 5, label: "5" },
    minDifficulty: { value: 1, label: "1" },
    maxDifficulty: { value: 5, label: "5" },
    minRating: { value: 1, label: "1" },
    maxRating: { value: 5, label: "5" },
};

function reducer(state, action, enqueueSnackbar) {
    switch (action.type) {
        case "setMinUsefulness":
            if (
                action.payload.minUsefulness.value <= state.maxUsefulness.value
            ) {
                return {
                    ...state,
                    minUsefulness: action.payload.minUsefulness,
                };
            } else {
                enqueueSnackbar(
                    "Cannot set minimum usefulness greater than maximum usefulness",
                    { variant: "error" }
                );
                return state;
            }
        case "setMaxUsefulness":
            if (
                action.payload.maxUsefulness.value >= state.minUsefulness.value
            ) {
                return {
                    ...state,
                    maxUsefulness: action.payload.maxUsefulness,
                };
            } else {
                enqueueSnackbar(
                    "Cannot set maximum usefulness less than minimum usefulness",
                    { variant: "error" }
                );
                return state;
            }
        case "setMinDifficulty":
            if (
                action.payload.minDifficulty.value <= state.maxDifficulty.value
            ) {
                return {
                    ...state,
                    minDifficulty: action.payload.minDifficulty,
                };
            } else {
                enqueueSnackbar(
                    "Cannot set minimum difficulty greater than maximum difficulty",
                    { variant: "error" }
                );
                return state;
            }
        case "setMaxDifficulty":
            if (
                action.payload.maxDifficulty.value >= state.minDifficulty.value
            ) {
                return {
                    ...state,
                    maxDifficulty: action.payload.maxDifficulty,
                };
            } else {
                enqueueSnackbar(
                    "Cannot set maximum difficulty less than minimum difficulty",
                    { variant: "error" }
                );
                return state;
            }
        case "setMinRating":
            if (action.payload.minRating.value <= state.maxRating.value) {
                return {
                    ...state,
                    minRating: action.payload.minRating,
                };
            } else {
                enqueueSnackbar(
                    "Cannot set minimum rating greater than maximum rating",
                    { variant: "error" }
                );
                return state;
            }
        case "setMaxRating":
            if (action.payload.maxRating.value >= state.minRating.value) {
                return {
                    ...state,
                    maxRating: action.payload.maxRating,
                };
            } else {
                enqueueSnackbar(
                    "Cannot set maximum rating less than minimum rating",
                    { variant: "error" }
                );
                return state;
            }
        default:
            return state;
    }
}

const ReviewFilterProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [state, dispatch] = useReducer(
        (state, action) => reducer(state, action, enqueueSnackbar),
        initialState
    );
    return (
        <ReviewFilterContext.Provider value={[state, dispatch]}>
            {children}
        </ReviewFilterContext.Provider>
    );
};

ReviewFilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ReviewFilterProvider;
