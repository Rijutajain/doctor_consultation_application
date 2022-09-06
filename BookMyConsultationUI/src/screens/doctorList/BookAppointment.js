import React, { useEffect, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormHelperText from '@mui/material/FormHelperText';
import { ValidatorForm } from "react-material-ui-form-validator"

function BookAppointment(props) {
    const { doctorForAppointment, openModal, changeAppointmentModalToFalse, userIdAfterLogin, userName } = props;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);
    const [timeSlotsList, setTimeSlotsList] = useState([]);
    const [symptoms, setSymptoms] = useState('');
    const [priorMedicalHistory, setPriorMedicalHistory] = useState('');

    const handleMedicalHistoryChange = (event) => {
        setPriorMedicalHistory(event.target.value);
    }

    const handleSymptomsChange = (event) => {
        setSymptoms(event.target.value);
    }

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    const TimeSelectionChangeHandler = (event) => {
        setSelectedTimeSlot(event.target.value);

    };

    async function getTimeSlotsList() {
        try {
            console.log(selectedDate);
            var myDate = selectedDate.toISOString().split('T')[0]
            var url = "http://localhost:8080/doctors/" + doctorForAppointment.id + "/timeSlots" + "?date=" + myDate;
            const rawresponse = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json;charset=UTF-8",
                    }
                })
            if (rawresponse.ok) {
                const response = await rawresponse.json();
                const fetchedTimeSlots = response.timeSlot;
                setTimeSlotsList(fetchedTimeSlots);
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
        if (doctorForAppointment.id != null) {
            getTimeSlotsList();
        }
    }, [doctorForAppointment, selectedDate])

    async function BookAppointment() {
        const param = {
            doctorId: doctorForAppointment.id,
            doctorName: doctorForAppointment.firstName + " " + doctorForAppointment.lastName,
            userId: userIdAfterLogin,
            userName: userName,
            userEmailId: userIdAfterLogin,
            appointmentDate: selectedDate,
            timeSlot: selectedTimeSlot,
            symptoms: symptoms,
            priorMedicalHistory: priorMedicalHistory
        }
        try {
            console.log(param);
            var url = "http://localhost:8080/appointments";
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
                alert("Appointment successfully Booked")
                changeAppointmentModalToFalse();

            }
            else {
                const errorback = await rawresponse.json();
                const error = new Error(errorback.message);
                throw error;
            }
        } catch (e) {
            alert("Either the slot is already booked or not available");
        }
    }
    function HandleBookAppointment() {
        BookAppointment();
    }
    return (
        <div>{(
            <Modal className="modalClass"
                isOpen={openModal}
                onRequestClose={changeAppointmentModalToFalse}>
                <div className="upperpanel">Book an Appointment</div>
                <TextField disabled id="doctorname" label="DoctorName*" value={doctorForAppointment.firstName + " " + doctorForAppointment.lastName} />
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <KeyboardDatePicker label="Date picker inline" format="yyyy-MM-dd" value={selectedDate} onChange={d => handleDateChange(d)} />
                </MuiPickersUtilsProvider><br />
                <ValidatorForm>
                    <InputLabel>Timeslot</InputLabel>
                    <Select
                        style={{ width: 250 }}
                        value={selectedTimeSlot}
                        onChange={TimeSelectionChangeHandler}
                        label="TimeSlots"
                        required
                    >
                        {timeSlotsList.map(timeSlotsEn => {
                            return (
                                <MenuItem key={timeSlotsEn.id} value={timeSlotsEn}>
                                    <ListItemText primary={timeSlotsEn} />
                                </MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                    <TextField id="medicalHistory" label="Medical History" variant="standard" onChange={handleMedicalHistoryChange} />
                    <TextField id="symptoms" label="Symptoms" variant="standard" onChange={handleSymptomsChange} />
                    <Button type="submit" style={{ fontSize: 15, width: '80%', margin: 10 }} variant="contained" color="primary" name="BookAppointment" onClick={HandleBookAppointment}>Book Appointment</Button>
                </ValidatorForm>
            </Modal>
        )
        }
        </div>
    )

}
export default BookAppointment;