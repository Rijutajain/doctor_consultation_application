import React from "react"
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

function Login(props) {
    const { value, index, changeModalToFalse, setUserLoggedIn, setUserIdAfterLogin, setUserName } = props;
    const [addLoginForm, setAddLoginForm] = React.useState({
        email: '',
        password: ''
    });

    const inputChangedHandler = (e) => {
        const state = addLoginForm;
        state[e.target.name] = e.target.value;
        setAddLoginForm({ ...state })
    }

    async function LoginHandler(e) {
        const param = window.btoa(addLoginForm.email + ":" + addLoginForm.password);
        console.log(param);
        try {
            var url = "http://localhost:8080/auth/login";
            const rawresponse = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json;charset=UTF-8",
                        "authorization": "Basic " + param,

                    }
                })
            if (rawresponse.ok) {
                var userResponse = await rawresponse.json();
                sessionStorage.setItem("isUserLoggedInStorage", "true")
                window.sessionStorage.setItem("access-token", userResponse.accessToken);
                setUserLoggedIn(true);
                setUserName(userResponse.firstName + " " + userResponse.lastName);
                setUserIdAfterLogin(userResponse.id);
                changeModalToFalse();
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
            (<ValidatorForm className="loginform" onSubmit={LoginHandler}>
                <div>
                    <TextValidator label="Email*" id="email" type="text" name="email" value={addLoginForm.email} onChange={inputChangedHandler} validators={['required', 'isEmail']} errorMessages={['Please fill out this field', 'Enter valid Email']}></TextValidator>
                    <TextValidator label="Password*" id="password" type="password" name="password" value={addLoginForm.password} onChange={inputChangedHandler} validators={['required']} errorMessages={['Please fill out this field']}></TextValidator>
                </div>
                <Button type="submit" className="lAndRButton" variant="contained" color="primary">Login</Button>
            </ValidatorForm>)
        }
        </div>
    )
}
export default Login;