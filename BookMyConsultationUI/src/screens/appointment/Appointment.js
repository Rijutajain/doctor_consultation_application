
import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Paper from '@mui/material/Paper';
import RateAppointment from "./RateAppointment";

function Appointment(props) {
    const { value, index, userLoggedIn, userIdAfterLogin } = props;
    const [appointmentList, setAppointmentList] = useState([]);
    const [openRatingModal, setRatingModalVisibility] = useState(false);
    const [appointment, setAppointment] = useState('');
    function changeRatingModalToTrue(Appointment) {
        setRatingModalVisibility(true);
        setAppointment(Appointment);
    }
    function changeRatingModalToFalse() {
        setRatingModalVisibility(false);
    }
    async function getAppointmentList() {
        try {
            var url = "http://localhost:8080/users/" + userIdAfterLogin + "/appointments";

            const rawresponse = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json;charset=UTF-8",
                        "Authorization": "Bearer " + sessionStorage.getItem("access-token")
                    }
                })
            if (rawresponse.ok) {
                const fetchedAppointmentList = await rawresponse.json();
                console.log(fetchedAppointmentList);
                setAppointmentList(fetchedAppointmentList);
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
    useEffect(() => {
        if (userLoggedIn === true && userIdAfterLogin != '') {
            getAppointmentList();
        }
    }
        , [userIdAfterLogin, value]);
    function HandleDateFormat(date){
        return date.split('T')[0];

    }
    return (
        <div>{value === index &&
            (<div className="appointmentList">
                {
                    userLoggedIn === false
                        ?
                        <div>Login to see appointments</div>
                        :

                        appointmentList.map(Appointment => (<Paper elevation={4}
                            style={{
                                padding: 20,
                                textAlign: "left",
                                height: 200,
                                margin: 15,
                            }} >
                            
                            <Typography style={{ fontSize: 27 }} color="textSecondary">Dr: {Appointment.doctorName} </Typography>
                            <Typography style={{ fontSize: 22 }} color="textSecondary">Date: {HandleDateFormat(Appointment.appointmentDate)} </Typography>
                            <Typography style={{ fontSize: 22 }} color="textSecondary">Symptoms : {Appointment.symptoms}</Typography>
                            <Typography style={{ fontSize: 22 }} color="textSecondary">PriorMedicalHistory: {Appointment.priorMedicalHistory} </Typography><br />
                            <Button style={{ fontSize: 20, width: '20%' }} variant="contained" color="primary" name="RateAppointment" onClick={() => changeRatingModalToTrue(Appointment)}>Rate Appointment</Button>
                        </Paper>))
                }
            </div>)
        }
            <RateAppointment appointment={appointment} openRatingModal={openRatingModal} changeRatingModalToFalse={changeRatingModalToFalse} />
        </div>
    )
}
export default Appointment;