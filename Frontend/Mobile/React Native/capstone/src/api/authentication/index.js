import axios, { Axios } from "axios";

export const Register = (displayName, username, emailAddress, dateOfBirth, password) => {
    alert("Registering user");
    try {
        axios.post("http://localhost:8080/authentication/register", {
            "displayName": displayName,
            "username": username,
            "emailAddress": emailAddress,
            "dateOfBirth": dateOfBirth,
            "password": password
        }).then((response) => {
            console.log(response);
        }
        );
       
    } catch (error) {
        throw new Error(error.message);
    }
  


};
