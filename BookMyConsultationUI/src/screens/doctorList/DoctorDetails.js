import React from "react";
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Modal from 'react-modal';


function ViewDetails(props) {
    const { doctorForAppointment, openDocDetailsModal, changeViewDetailsModalToFalse } = props;
    return (
        < div >
            {
                doctorForAppointment != ''
                    ?
                    <Modal className="viewDetailsModalClass"
                        isOpen={openDocDetailsModal}
                        onRequestClose={changeViewDetailsModalToFalse}>
                        <div className="viewDetailsUpperpanel">Doctor Details</div>
                        <Typography style={{ fontSize: 27, marginLeft: 10 }} color="black">Dr. {doctorForAppointment.firstName + " " + doctorForAppointment.lastName} </Typography>
                        <Typography style={{ fontSize: 21, marginLeft: 10 }} color="black">Total Experience: {doctorForAppointment.totalYearsOfExp} years</Typography>
                        <Typography style={{ fontSize: 21, marginLeft: 10 }} color="black">Speciality: {doctorForAppointment.speciality}</Typography>
                        <Typography style={{ fontSize: 21, marginLeft: 10 }} color="black">Date of birth: {doctorForAppointment.dob}</Typography>
                        <Typography style={{ fontSize: 21, marginLeft: 10 }} color="black">City: {doctorForAppointment.address.city}</Typography>
                        <Typography style={{ fontSize: 21, marginLeft: 10 }} color="black">Email: {doctorForAppointment.emailId}</Typography>
                        <Typography style={{ fontSize: 21, marginLeft: 10 }} color="black">Mobile: {doctorForAppointment.mobile}</Typography>
                        <div className = "RatingAndLabel">
                        <Typography style={{ fontSize: 21, marginLeft: 10 }} color="black">Rating: </Typography>
                        <Rating name="half-rating-read" value={doctorForAppointment.rating} precision={0.5} readOnly />
                        </div>
                    </Modal>
                    :
                    <div />
            }
        </div >

    )

}
export default ViewDetails;