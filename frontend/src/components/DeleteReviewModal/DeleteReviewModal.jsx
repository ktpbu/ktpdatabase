import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import PropTypes from "prop-types";

const backend = import.meta.env.VITE_BACKEND_URL;

const DeleteReviewModal = ({ courseId, professor, id }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [enteredText, setEnteredText] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEnteredText("");
        setOpen(false);
    };

    const handleDelete = () => {
        if (enteredText === `${courseId} ${professor}`) {
            axios
                .delete(`${backend}/account/reviews/delete-review/${id}`)
                .then(() => {
                    setOpen(false);
                    enqueueSnackbar("Review deleted successfully", {
                        variant: "success",
                    });
                    window.location.reload();
                })
                .catch((error) => {
                    enqueueSnackbar("Error", { variant: "error" });
                    console.log(error);
                });
        } else {
            enqueueSnackbar("Confirmation text entered incorrectly", {
                variant: "error",
            });
        }
        setEnteredText("");
    };

    return (
        <div>
            <Link onClick={() => handleOpen()} to="">
                <DeleteIcon className="mx-auto text-black" size={24} />
            </Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="w-fit m-auto p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-column justify-center shadow border-2 border-solid border-black bg-white">
                    <p className="w-60 mx-auto">
                        Type {`"${courseId} ${professor}"`} in the box below
                    </p>
                    <div className="w-fit m-auto">
                        <input
                            className="w-60 h-8 m-auto px-2 text-center border-1 border-gray-200"
                            type="text"
                            value={enteredText}
                            onChange={(e) => setEnteredText(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-fit mx-auto my-4 p-2 border-2 border-solid ${ hover:border-red-500 rounded-3xl"
                        onClick={handleDelete}
                    >
                        Confirm Review Deletion
                    </button>
                </div>
            </Modal>
        </div>
    );
};

DeleteReviewModal.propTypes = {
    courseId: PropTypes.string.isRequired,
    professor: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deleteItem: PropTypes.string.isRequired,
};

export default DeleteReviewModal;
