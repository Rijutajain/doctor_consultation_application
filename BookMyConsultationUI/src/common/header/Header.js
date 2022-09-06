import React from "react"
import "./Header.css"
import logo from "../../assets/logo.jpeg";
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';
import { Tab, Tabs } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import Login from "../../screens/login/Login.js";
import Register from "../../screens/register/Register.js";


const Header = (props) => {
    const history = useHistory();
    const { userLoggedIn, setUserLoggedIn, setUserIdAfterLogin, setUserName } = props;
    const [openModal, setModal] = React.useState(false);
    const [value, setValue] = React.useState(0);

    function logoutHandler() {
        sessionStorage.setItem("isUserLoggedInStorage", "false");
        setUserLoggedIn(false);
        sessionStorage.removeItem("access-token");
    }

    function changeModalToTrue() {
        setModal(true);
    }

    function changeModalToFalse() {
        setModal(false);
    }

    const handleTabs = (e, val) => {
        setValue(val);
    }
    return (
        <div className="outerDiv">
            <div className="header">
                <div className="logoAndText">
                    <img className="logo" src={logo} alt="logo" />
                    <div style={{ color: "white", fontSize: 30 ,marginLeft: 40}} >Doctor Finder</div>
                </div>
                <div className="buttonsContainer">
                    {
                        userLoggedIn === false
                            ?
                            <div className="singlebuttonContainer">
                                <Button variant="contained" color="primary" name="Login" onClick={changeModalToTrue}>Login</Button>
                            </div>
                            :
                            <div className="singlebuttonContainer">
                                <Button variant="contained" color="secondary" name="Logout" onClick={logoutHandler}>Logout</Button>
                            </div>
                    }
                </div>
            </div>

            <Modal className="modalClass"
                isOpen={openModal}
                onRequestClose={changeModalToFalse}>
                <div className="upperpanel">Authentication</div>
                <Tabs style={{ textAlign: "center" }} value={value} onChange={handleTabs} centered>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <Login setUserName={setUserName} setUserIdAfterLogin={setUserIdAfterLogin} setUserLoggedIn={setUserLoggedIn} changeModalToFalse={changeModalToFalse} value={value} index={0}></Login>
                <Register value={value} index={1}></Register>
            </Modal>
        </div>
    );
}
export default Header;