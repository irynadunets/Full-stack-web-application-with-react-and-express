import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//show appointment list
const AppointmentList = () => {
    const [appointments, setAppointment] = useState([]);
    const [Message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAppointments();
    }, []);
    //get appointments
    const getAppointments = async() => {
        const response = await axios.get("http://localhost:3001/api/appointments", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setAppointment(response.data);
    };
    //delete appointment
    const deleteAppointment = async(id) => {
        try {
            await axios.delete(`http://localhost:3001/api/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            getAppointments();
        } catch (error) {
            setMessage("appointment does not exist");
            console.log(JSON.stringify(error.message));
        }
    };

    return ( <
        div class = "hero is-success" >
        <
        div class = "hero-body" >
        <
        p class = "title" > Appointment List < /p>{" "} <
        div className = "columns mt-5" >
        <
        div className = "column is-half" >
        <
        Link to = "add"
        className = "button is-success is-light" >
        Add New { " " } <
        /Link>{" "} <
        button onClick = {
            () => navigate("/")
        }
        className = "button is-danger is-light" >
        Log Out { " " } <
        /button>{" "} <
        table className = "table is-striped is-fullwidth mt-2" >
        <
        thead >
        <
        tr >
        <
        th > No < /th> <th> Patient </th > < th > Date < /th>{" "} <
        th > Doctor < /th> <th> Category </th > { " " } <
        /tr>{" "} < /
        thead > { " " } <
        tbody > { " " } {
            appointments.map((appointment, index) => ( <
                tr key = { appointment.id } >
                <
                td > { index + 1 } < /td> <td> {appointment.patient} </td > { " " } <
                td > { appointment.date } < /td>{" "} <
                td > { appointment.doctor } < /td>{" "} <
                td > { appointment.category } < /td>{" "} <
                td >
                <
                Link to = { `edit/${appointment.id}` }
                className = "button is-warning is-light" >
                Edit { " " } <
                /Link>{" "} <
                button onClick = {
                    () => deleteAppointment(appointment.id)
                }
                className = "button is-danger is-light" >
                Delete { " " } <
                /button>{" "} < /
                td > { " " } <
                /tr>
            ))
        } { " " } <
        /tbody>{" "} < /
        table > { " " } {
            Message && ( <
                article class = "message is-danger" >
                <
                div class = "message-body" > { Message } < /div>{" "} < /
                article >
            )
        } { " " } <
        /div>{" "} < /
        div > { " " } <
        /div>{" "} < /
        div >
    );
};

export default AppointmentList;