import Select from "react-select";
import PropTypes, { number, string } from "prop-types";

const ReviewFilter = ({
    minUsefulness,
    setMinUsefulness,
    maxUsefulness,
    setMaxUsefulness,
    minDifficulty,
    setMinDifficulty,
    maxDifficulty,
    setMaxDifficulty,
    minRating,
    setMinRating,
    maxRating,
    setMaxRating,
}) => {
    const valueOptions = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ];
    const resetFilters = () => {
        setMinUsefulness({ value: 1, label: "1" });
        setMaxUsefulness({ value: 5, label: "5" });
        setMinDifficulty({ value: 1, label: "1" });
        setMaxDifficulty({ value: 5, label: "5" });
        setMinRating({ value: 1, label: "1" });
        setMaxRating({ value: 5, label: "5" });
    };
    return (
        <div>
            <div className="w-144 max-w-full mx-auto mt-4 flex flex-wrap">
                <div className="w-64 mx-auto my-auto flex justify-between">
                    <h6 className="my-auto">Minimum Usefulness</h6>
                    <Select
                        options={valueOptions}
                        value={minUsefulness}
                        onChange={(selectedOption) =>
                            selectedOption &&
                            setMinUsefulness({
                                value: selectedOption.value,
                                label: selectedOption.label,
                            })
                        }
                        isSearchable={false}
                    />
                </div>
                <div className="w-64 mx-auto my-auto flex justify-between">
                    <h6 className="my-auto">Maximum Usefulness</h6>
                    <Select
                        options={valueOptions}
                        value={maxUsefulness}
                        onChange={(selectedOption) =>
                            selectedOption &&
                            setMaxUsefulness({
                                value: selectedOption.value,
                                label: selectedOption.label,
                            })
                        }
                        isSearchable={false}
                    />
                </div>
            </div>
            <div className="w-144 max-w-full mx-auto mt-4 flex flex-wrap">
                <div className="w-64 mx-auto my-auto flex justify-between">
                    <h6 className="my-auto">Minimum Difficulty</h6>
                    <Select
                        options={valueOptions}
                        value={minDifficulty}
                        onChange={(selectedOption) =>
                            selectedOption &&
                            setMinDifficulty({
                                value: selectedOption.value,
                                label: selectedOption.label,
                            })
                        }
                        isSearchable={false}
                    />
                </div>
                <div className="w-64 mx-auto my-auto flex justify-between">
                    <h6 className="my-auto">Maximum Difficulty</h6>
                    <Select
                        options={valueOptions}
                        value={maxDifficulty}
                        onChange={(selectedOption) =>
                            selectedOption &&
                            setMaxDifficulty({
                                value: selectedOption.value,
                                label: selectedOption.label,
                            })
                        }
                        isSearchable={false}
                    />
                </div>
            </div>
            <div className="w-144 max-w-full mx-auto mt-4 flex flex-wrap">
                <div className="w-64 mx-auto my-auto flex justify-between">
                    <h6 className="my-auto">Minimum Rating</h6>
                    <Select
                        options={valueOptions}
                        value={minRating}
                        onChange={(selectedOption) =>
                            selectedOption &&
                            setMinRating({
                                value: selectedOption.value,
                                label: selectedOption.label,
                            })
                        }
                        isSearchable={false}
                    />
                </div>
                <div className="w-64 mx-auto my-auto flex justify-between">
                    <h6 className="my-auto">Maximum Rating</h6>
                    <Select
                        options={valueOptions}
                        value={maxRating}
                        onChange={(selectedOption) =>
                            selectedOption &&
                            setMaxRating({
                                value: selectedOption.value,
                                label: selectedOption.label,
                            })
                        }
                        isSearchable={false}
                    />
                </div>
            </div>
            <button
                onClick={resetFilters}
                className="mt-2 p-2 border-2 border-solid hover:border-black rounded-3xl"
            >
                Reset Filters
            </button>
        </div>
    );
};

ReviewFilter.propTypes = {
    minUsefulness: PropTypes.shape({ value: number, label: string }).isRequired,
    setMinUsefulness: PropTypes.func.isRequired,
    maxUsefulness: PropTypes.shape({ value: number, label: string }).isRequired,
    setMaxUsefulness: PropTypes.func.isRequired,
    minDifficulty: PropTypes.shape({ value: number, label: string }).isRequired,
    setMinDifficulty: PropTypes.func.isRequired,
    maxDifficulty: PropTypes.shape({ value: number, label: string }).isRequired,
    setMaxDifficulty: PropTypes.func.isRequired,
    minRating: PropTypes.shape({ value: number, label: string }).isRequired,
    setMinRating: PropTypes.func.isRequired,
    maxRating: PropTypes.shape({ value: number, label: string }).isRequired,
    setMaxRating: PropTypes.func.isRequired,
};

export default ReviewFilter;
