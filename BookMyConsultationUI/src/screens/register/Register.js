import React from "react"
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

function Register(props) {
    const [addRegisterForm, setAddRegisterForm] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        contact: ''
    });
    const { value, index } = props;
    const [regVisibility, setregVisibility] = React.useState("hideVisibilityCss");

    const inputChangedHandler = (e) => {
        const state = addRegisterForm;
        state[e.target.name] = e.target.value;
        setAddRegisterForm({ ...state })
    }

    async function RegisterHandler(e) {
        e.preventDefault();
        const param = {
            emailId: addRegisterForm.email,
            firstName: addRegisterForm.firstname,
            lastName: addRegisterForm.lastname,
            mobile: addRegisterForm.contact,
            password: addRegisterForm.password
        }
        try {
            var url = "http://localhost:8080/users/register"
            const rawresponse = await fetch(url,
                {
                    body: JSON.stringify(param),
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=UTF-8"
                    }
                })
            if (rawresponse.ok) {
                setregVisibility(true);
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

    return (
        <div>{value === index &&
            (<ValidatorForm className="registerform" onSubmit={RegisterHandler} >
                <div>
                    <TextValidator label="First Name" id="firstname" type="text" value={addRegisterForm.firstname} name="firstname" onChange={inputChangedHandler} validators={['required']} errorMessages={['Please fill out this field']}></TextValidator>
                    <TextValidator label="Last Name" id="lastname" type="text" value={addRegisterForm.lastname} name="lastname" onChange={inputChangedHandler} align="center" validators={['required']} errorMessages={['Please fill out this field']}></TextValidator>
                    <TextValidator label="Email" id="email" type="text" value={addRegisterForm.email} name="email" onChange={inputChangedHandler} validators={['required','isEmail']} errorMessages={['Please fill out this field','Enter valid Email']}></TextValidator>
                    <TextValidator label="Password" id="password" type="password" value={addRegisterForm.password} name="password" onChange={inputChangedHandler} validators={['required']} errorMessages={['Please fill out this field']}></TextValidator>
                    <TextValidator label="Contact no." id="contact" type="text" value={addRegisterForm.contact} name="contact" onChange={inputChangedHandler} validators={['required']} errorMessages={['Please fill out this field']}></TextValidator>
                </div>
                <div className={regVisibility}>Registration Successful. Please Login!</div>
                <Button type="submit" className="lAndRButton" variant="contained" color="primary" >Register</Button>
            </ValidatorForm>)
        }
        </div>
    )
}
export default Register;