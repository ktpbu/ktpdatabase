import Select from "react-select";
import PropTypes from "prop-types";

const ReviewFilter = ({
    minUsefulness,
    setMinUsefulnessHelper,
    maxUsefulness,
    setMaxUsefulnessHelper,
    minDifficulty,
    setMinDifficultyHelper,
    maxDifficulty,
    setMaxDifficultyHelper,
    minRating,
    setMinRatingHelper,
    maxRating,
    setMaxRatingHelper,
}) => {
    const valueOptions = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ];

    const resetFilters = () => {
        setMinUsefulnessHelper({ value: 1, label: "1" });
        setMaxUsefulnessHelper({ value: 5, label: "5" });
        setMinDifficultyHelper({ value: 1, label: "1" });
        setMaxDifficultyHelper({ value: 5, label: "5" });
        setMinRatingHelper({ value: 1, label: "1" });
        setMaxRatingHelper({ value: 5, label: "5" });
    };

    const filters = [
        {
            pair: "usefulness",
            minimum: {
                header: "Minimum Usefulness",
                options: valueOptions,
                value: minUsefulness,
                update: setMinUsefulnessHelper,
                searchable: false,
            },
            maximum: {
                header: "Maximum Usefulness",
                options: valueOptions,
                value: maxUsefulness,
                update: setMaxUsefulnessHelper,
                searchable: false,
            },
        },
        {
            pair: "difficulty",
            minimum: {
                header: "Minimum Difficulty",
                options: valueOptions,
                value: minDifficulty,
                update: setMinDifficultyHelper,
                searchable: false,
            },
            maximum: {
                header: "Maximum Difficulty",
                options: valueOptions,
                value: maxDifficulty,
                update: setMaxDifficultyHelper,
                searchable: false,
            },
        },
        {
            pair: "rating",
            minimum: {
                header: "Minimum Rating",
                options: valueOptions,
                value: minRating,
                update: setMinRatingHelper,
                searchable: false,
            },
            maximum: {
                header: "Maximum Rating",
                options: valueOptions,
                value: maxRating,
                update: setMaxRatingHelper,
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
                                    filterPair.minimum.update({
                                        value: selectedOption.value,
                                        label: selectedOption.label,
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
                                    filterPair.maximum.update({
                                        value: selectedOption.value,
                                        label: selectedOption.label,
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
                className="mt-4 p-2 border-2 border-solid hover:border-black rounded-3xl"
            >
                Reset Filters
            </button>
        </div>
    );
};

ReviewFilter.propTypes = {
    minUsefulness: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
    }).isRequired,
    setMinUsefulnessHelper: PropTypes.func.isRequired,
    maxUsefulness: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
    }).isRequired,
    setMaxUsefulnessHelper: PropTypes.func.isRequired,
    minDifficulty: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
    }).isRequired,
    setMinDifficultyHelper: PropTypes.func.isRequired,
    maxDifficulty: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
    }).isRequired,
    setMaxDifficultyHelper: PropTypes.func.isRequired,
    minRating: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
    }).isRequired,
    setMinRatingHelper: PropTypes.func.isRequired,
    maxRating: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
    }).isRequired,
    setMaxRatingHelper: PropTypes.func.isRequired,
};

export default ReviewFilter;
