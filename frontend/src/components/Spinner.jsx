import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = () => {
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        </div>
    );
};

export default Spinner;
