
import React, {useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';
import Rating from '@material-ui/lab/Rating';

function RateAppointment(props) {
    const { appointment, openRatingModal, changeRatingModalToFalse } = props;
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
    const [RatingRequiredVisibility, setRatingRequiredVisibility] = useState("hideRequiredVisibility")
    const handleRatingChange = (event) => {
        setRating(event.target.value);
        setRatingRequiredVisibility("hideRequiredVisibility");
    }
    function changeRatingState(e) {
        setComments('');
        setRating('');
        setRatingRequiredVisibility("hideRequiredVisibility");
    }
    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    }
    async function RateAppointment() {
        const param = {
            appointmentId: appointment.appointmentId,
            doctorId: appointment.doctorId,
            rating: rating,
            comment: comments
        }
        try {
            console.log(param);
            var url = "http://localhost:8080/ratings";
            const rawresponse = await fetch(url,
                {
                    body: JSON.stringify(param),
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                        "Authorization": "Bearer " + sessionStorage.getItem("access-token")
                    }
                })
            if (rawresponse.ok) {
                alert("Ratings submitted!")
                changeRatingModalToFalse();

            }
            else {
                const errorback = await rawresponse.json();
                const error = new Error(errorback.message);
                throw error;
            }
        } catch (e) {
            alert(e.message);
        }
    }
    function handleRateAppointment() {
        if (rating === '') {
            setRatingRequiredVisibility(true);
            return;
        }
        RateAppointment();
    }
    return (
        <div>{(
            <Modal className="RatingmodalClass"
                isOpen={openRatingModal}
                onRequestClose={changeRatingModalToFalse}
                onAfterOpen={changeRatingState}>
                <div className="upperpanel">Rate Appointment</div>

                <TextField id="comments" label="Comments" variant="standard" onChange={handleCommentsChange} />
                <div className = "RatingAndLabel">
                <div>Rating :</div>
                <Rating name="size-large" size="large" onChange={handleRatingChange} />
                </div>
                <div className={RatingRequiredVisibility}>Select a Rating!</div>
                <Button type="submit" style={{ fontSize: 18, width: '50%' }} variant="contained" color="primary" name="RateAppointment" onClick={handleRateAppointment}>Rate Appointment</Button>

            </Modal>
        )}
        </div>
    )
}
export default RateAppointment;

