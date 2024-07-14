import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";

const CustomCheckbox = ({ label, labelPlacement, checked, setChecked }) => {
    return (
        <div className="mx-auto my-2">
            <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => {
                                    setChecked(e.target.checked);
                                }}
                            />
                        }
                        label={label}
                        labelPlacement={labelPlacement}
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
};

CustomCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    labelPlacement: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    setChecked: PropTypes.func.isRequired,
};

export default CustomCheckbox;
