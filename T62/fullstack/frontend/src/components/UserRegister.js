import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//user register
const UserRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Message, setMessage] = useState("");
    const navigate = useNavigate();

    let userRegister = async(e) => {
        e.preventDefault();
        setMessage("");
        try {
            await axios.post("http://localhost:3001/api/users", {
                username,
                password,
            });
            navigate("/");
        } catch (error) {
            setMessage("Invalid login or password");
            console.log(JSON.stringify(error.message));
        }
    };

    return ( <
            div class = "columns is-mobile is-centered" >
            <
            div class = "column is-one-third" >
            <
            h1 class = "title" > Medical Appointment App < /h1>{" "} {
            Message && ( <
                article class = "message is-danger" >
                <
                div class = "message-body" > { Message } < /div>{" "} < /
                article >
            )
        } { " " } <
        div class = "field" >
        <
        p class = "control has-icons-left has-icons-right" >
        <
        input class = "input"
    type = "email"
    placeholder = "Email"
    value = { username }
    onChange = {
        (e) => setUsername(e.target.value)
    }
    />{" "} <
    span class = "icon is-small is-left" >
        <
        i class = "fas fa-envelope" > < /i>{" "} < /
        span > { " " } <
        span class = "icon is-small is-right" >
        <
        i class = "fas fa-check" > < /i>{" "} < /
        span > { " " } <
        /p>{" "} < /
        div > { " " } <
        div class = "field" >
        <
        p class = "control has-icons-left" >
        <
        input class = "input"
    type = "password"
    placeholder = "Password"
    value = { password }
    onChange = {
        (e) => setPassword(e.target.value)
    }
    />{" "} <
    span class = "icon is-small is-left" >
        <
        i class = "fas fa-lock" > < /i>{" "} < /
        span > { " " } <
        /p>{" "} < /
        div > { " " } <
        div class = "field" >
        <
        p class = "control" >
        <
        button class = "button is-success"
    onClick = { userRegister } > { " " }
    Register { " " } <
    /button>{" "} < /
    p > { " " } <
        /div>{" "} < /
        div > { " " } <
        /div>
);
};

export default UserRegister;