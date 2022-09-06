import React, {useState } from "react";
import "./Home.css"
import {Tab, Tabs } from "@material-ui/core";
import Header from "../../common/header/Header"
import DoctorsList from "../doctorList/DoctorList"
import Appointment from "../appointment/Appointment";



function Home(props) {
    const [userLoggedIn, setUserLoggedIn] = React.useState(sessionStorage.getItem("isUserLoggedInStorage") === "true");
    const [value, setValue] = React.useState(0);
    const [userIdAfterLogin , setUserIdAfterLogin] = useState('');
    const [userName, setUserName] = useState('');
    const handleTabs = (e, val) => {
        setValue(val);
    }
    
    return (
        <div>
            <Header setUserName = {setUserName} setUserIdAfterLogin = {setUserIdAfterLogin} userLoggedIn = {userLoggedIn} setUserLoggedIn = {setUserLoggedIn} baseUrl={props.baseUrl} />
            <Tabs style={{ color: "blue" }} value={value} onChange={handleTabs} centered>
                <Tab label="DOCTORS" />
                <Tab label="APPOINTMENT" />
            </Tabs>
           
            <DoctorsList userName = {userName} userIdAfterLogin = {userIdAfterLogin} userLoggedIn={userLoggedIn} value={value} index={0}></DoctorsList>
             <Appointment userIdAfterLogin = {userIdAfterLogin} userLoggedIn={userLoggedIn} value={value} index={1}></Appointment>
        </div>
    )
}
export default Home;