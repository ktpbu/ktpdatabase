import { useContext, useEffect } from "react";
import Select from "react-select";

import { ReviewFilterContext } from "../contexts/ReviewFilterContext";

const ReviewFilter = () => {
    const [state, dispatch] = useContext(ReviewFilterContext);

    const resetFilters = () => {
        dispatch({
            type: "setMinUsefulness",
            payload: { minUsefulness: { value: 1, label: "1" } },
        });
        dispatch({
            type: "setMaxUsefulness",
            payload: { maxUsefulness: { value: 5, label: "5" } },
        });
        dispatch({
            type: "setMinDifficulty",
            payload: { minDifficulty: { value: 1, label: "1" } },
        });
        dispatch({
            type: "setMaxDifficulty",
            payload: { maxDifficulty: { value: 5, label: "5" } },
        });
        dispatch({
            type: "setMinRating",
            payload: { minRating: { value: 1, label: "1" } },
        });
        dispatch({
            type: "setMaxRating",
            payload: { maxRating: { value: 5, label: "5" } },
        });
    };

    useEffect(() => {
        resetFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const valueOptions = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ];

    const filters = [
        {
            pair: "usefulness",
            minimum: {
                header: "Minimum Usefulness",
                options: valueOptions,
                value: state.minUsefulness,
                type: "setMinUsefulness",
                payload: "minUsefulness",
                searchable: false,
            },
            maximum: {
                header: "Maximum Usefulness",
                options: valueOptions,
                value: state.maxUsefulness,
                type: "setMaxUsefulness",
                payload: "maxUsefulness",
                searchable: false,
            },
        },
        {
            pair: "difficulty",
            minimum: {
                header: "Minimum Difficulty",
                options: valueOptions,
                value: state.minDifficulty,
                type: "setMinDifficulty",
                payload: "minDifficulty",
                searchable: false,
            },
            maximum: {
                header: "Maximum Difficulty",
                options: valueOptions,
                value: state.maxDifficulty,
                type: "setMaxDifficulty",
                payload: "maxDifficulty",
                searchable: false,
            },
        },
        {
            pair: "rating",
            minimum: {
                header: "Minimum Rating",
                options: valueOptions,
                value: state.minRating,
                type: "setMinRating",
                payload: "minRating",
                searchable: false,
            },
            maximum: {
                header: "Maximum Rating",
                options: valueOptions,
                value: state.maxRating,
                type: "setMaxRating",
                payload: "maxRating",
                searchable: false,
            },
        },
    ];

    return (
        <div>
            <div className="w-144 max-w-full mx-auto mt-4 flex flex-wrap">
                {filters.map((filterPair) => (
                    <div
                        key={filterPair.pair}
                        className="w-144 max-w-full mx-auto mt-4 flex flex-wrap"
                    >
                        <div className="w-64 mx-auto my-auto flex justify-between">
                            <h6 className="my-auto">
                                {filterPair.minimum.header}
                            </h6>
                            <Select
                                options={filterPair.minimum.options}
                                value={filterPair.minimum.value}
                                onChange={(selectedOption) =>
                                    selectedOption &&
                                    dispatch({
                                        type: filterPair.minimum.type,
                                        payload: {
                                            [filterPair.minimum.payload]:
                                                selectedOption,
                                        },
                                    })
                                }
                                isSearchable={filterPair.minimum.searchable}
                            />
                        </div>
                        <div className="w-64 mx-auto my-auto flex justify-between">
                            <h6 className="my-auto">
                                {filterPair.maximum.header}
                            </h6>
                            <Select
                                options={filterPair.maximum.options}
                                value={filterPair.maximum.value}
                                onChange={(selectedOption) =>
                                    selectedOption &&
                                    dispatch({
                                        type: filterPair.maximum.type,
                                        payload: {
                                            [filterPair.maximum.payload]:
                                                selectedOption,
                                        },
                                    })
                                }
                                isSearchable={filterPair.maximum.searchable}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={resetFilters}
                className="mt-4 p-2 border-2 border-solid hover:border-[#234c8b] rounded-3xl bg-white"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default ReviewFilter;
