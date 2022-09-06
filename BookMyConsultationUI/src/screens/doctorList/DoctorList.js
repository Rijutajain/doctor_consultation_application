import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Paper from '@mui/material/Paper';
import Rating from '@material-ui/lab/Rating';
import BookAppointment from "./BookAppointment";
import ViewDetails from "./DoctorDetails";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import {getDoctorList,getDoctorListByFilter,getSpecialityList} from "../../util/fetch";


function DoctorsList(props) {
    const { value, index, userLoggedIn, userIdAfterLogin, userName } = props;
    const [DoctorList, setDoctorList] = useState([]);
    const [openModal, setAppointmentModalVisibility] = useState(false);
    const [openDocDetailsModal, setViewDetailsModalVisibility] = useState(false);
    const [doctorForAppointment, setDoctorForAppointment] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState([]);
    const [specialityList, setSpecialityList] = useState([]);

    const selectionChangeHandler = (event) => {
        setSelectedSpeciality(event.target.value);
    };
    function changeViewDetailsModalToTrue(doctor) {
        setViewDetailsModalVisibility(true);
        setDoctorForAppointment(doctor);
    }
    function changeViewDetailsModalToFalse() {
        setViewDetailsModalVisibility(false);
    }
    function changeAppointmentModalToTrue(doctor) {
        setAppointmentModalVisibility(true);
        setDoctorForAppointment(doctor);

    }
    function changeAppointmentModalToFalse() {
        setAppointmentModalVisibility(false);
    }

    useEffect(() => {
        getDoctorList(setDoctorList);
        getSpecialityList(setSpecialityList);
    }, []);

    useEffect(() => {
       getDoctorListByFilter(selectedSpeciality,setDoctorList);
    }, [selectedSpeciality]);

    return (
        <div>
            <div>{value === index &&
                (<div className="filter">
                    <FormControl style={{ align: "center", width: 250 }} >
                        <InputLabel>Select Speciality</InputLabel>
                        <Select
                            value={selectedSpeciality}
                            onChange={selectionChangeHandler}
                            input={<Input id="select-speciality" placeholder="Specialities" />}
                        >
                            {specialityList.map(specialityEn => {
                                var specialityName = specialityEn
                                return (
                                    <MenuItem key={specialityEn.id} value={specialityName}>
                                        <ListItemText primary={specialityName} />
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>)
            }
            </div>
            <div>{value === index &&
                (<div className="doctorList">
                    {DoctorList.map(Doctor => (<Paper elevation={4}
                        style={{
                            padding: 20,
                            textAlign: "left",
                            width: '40%',
                            height: 200,
                            margin: 15,
                        }} >

                        <Typography style={{ fontSize: 22 }} color="textSecondary">DOCTOR NAME : {Doctor.firstName + " " + Doctor.lastName} </Typography>
                        <Typography style={{ fontSize: 22 }} color="textSecondary">SPECIALITY : {Doctor.speciality} </Typography>
                        <div className="RatingAndLabel">
                        <Typography style={{ fontSize: 22 }} color="textSecondary">Rating : </Typography>
                        <Rating name="half-rating-read" value={Doctor.rating} precision={0.5} readOnly />
                        </div><br/>
                        <Button style={{ fontSize: 20, width: '40%', marginRight: 10 }} variant="contained" color="primary" name="BookAppointment" onClick={() => changeAppointmentModalToTrue(Doctor)}>Book Appointment</Button>
                        <Button style={{ backgroundColor: "green", fontSize: 20, width: '40%', marginLeft: 10 }} variant="contained" color="primary" name="ViewDetails" onClick={() => changeViewDetailsModalToTrue(Doctor)} >View Details</Button>

                    </Paper>))}
                </div>)
            }
                <BookAppointment userName={userName} userIdAfterLogin={userIdAfterLogin} userLoggedIn={userLoggedIn} doctorForAppointment={doctorForAppointment} openModal={openModal} changeAppointmentModalToFalse={changeAppointmentModalToFalse}></BookAppointment>
                <ViewDetails userLoggedIn={userLoggedIn} doctorForAppointment={doctorForAppointment} openDocDetailsModal={openDocDetailsModal} changeViewDetailsModalToFalse={changeViewDetailsModalToFalse}></ViewDetails>
            </div>
        </div>
    )
}
export default DoctorsList;