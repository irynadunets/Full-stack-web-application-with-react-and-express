import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//add new appointment
const AddAppointment = () => {
    const [patient, setPatient] = useState("");
    const [date, setDate] = useState("");
    const [doctor, setDoctor] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    //save appointment
    const saveAppointment = async(e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:3001/api/appointments", {
                    patient,
                    date,
                    doctor,
                    category,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            navigate("/api/appointments");
        } catch (error) {
            console.log(JSON.stringify(error.message));
        }
    };

    return ( <
        div className = "columns mt-5" >
        <
        div className = "column is-half" >
        <
        form onSubmit = { saveAppointment } >
        <
        div className = "field" >
        <
        label className = "label" > Patient < /label>{" "} <
        div className = "control" >
        <
        input type = "text"
        className = "input"
        value = { patient }
        onChange = {
            (e) => setPatient(e.target.value)
        }
        placeholder = "Patient" /
        >
        <
        /div>{" "} < /
        div > { " " } <
        div className = "field" >
        <
        label className = "label" > Date < /label>{" "} <
        div className = "control" >
        <
        input type = "date"
        className = "input"
        value = { date }
        onChange = {
            (e) => setDate(e.target.value)
        }
        placeholder = "Date" /
        >
        <
        /div>{" "} < /
        div > { " " } <
        div className = "field" >
        <
        label className = "label" > Doctor < /label>{" "} <
        div className = "control" >
        <
        input type = "text"
        className = "input"
        value = { doctor }
        onChange = {
            (e) => setDoctor(e.target.value)
        }
        placeholder = "Doctor" /
        >
        <
        /div>{" "} < /
        div > { " " } <
        div className = "field" >
        <
        label className = "label" > Category < /label>{" "} <
        div className = "control" >
        <
        input type = "text"
        className = "input"
        value = { category }
        onChange = {
            (e) => setCategory(e.target.value)
        }
        placeholder = "Category" /
        >
        <
        /div>{" "} < /
        div > { " " } <
        div className = "field" >
        <
        div className = "control" >
        <
        button type = "submit"
        className = "button is-primary" > { " " }
        Save { " " } <
        /button>{" "} < /
        div > { " " } <
        /div>{" "} < /
        form > { " " } <
        /div>{" "} < /
        div >
    );
};

export default AddAppointment;