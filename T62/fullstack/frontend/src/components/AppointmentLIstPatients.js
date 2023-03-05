import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
    const [appointmentsAll, setAppointmentsAll] = useState([]);
    const [appointments, setAppointment] = useState([]);
    const navigate = useNavigate();
    const [choise, setSelect] = useState("");
    //select by date
    const selectByDate = (time) => {
        setSelect(time);
        const date = new Date();
        const dateNow = date.toISOString().substring(0, 10);
        if (time === "All") return appointmentsAll;
        if (time === "Today") return appointmentsAll.filter((d) => d.date === dateNow);
        if (time === "Future") return appointmentsAll.filter((d) => d.date > dateNow);
        if (time === "Overdue") return appointmentsAll.filter((d) => d.date < dateNow);
    };

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
        setAppointmentsAll(response.data);
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
        div class = "select" >
        <
        select onChange = {
            (event) => setAppointment(selectByDate(event.target.value))
        }
        value = { choise }
        class = "is-focused" >
        <
        option > Select by date < /option>{" "} <
        option value = "All" > All appointments < /option>{" "} <
        option value = "Today" > Today appointments < /option>{" "} <
        option value = "Future" > Future appointments < /option>{" "} <
        option value = "Overdue" > Overdue appointments < /option>{" "} < /
        select > { " " } <
        /div>{" "} <
        button onClick = {
            () => navigate("/")
        }
        className = "button is-focused is-light" >
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
                td > { appointment.category } < /td>{" "} < /
                tr >
            ))
        } { " " } <
        /tbody>{" "} < /
        table > { " " } <
        /div>{" "} < /
        div > { " " } <
        /div>{" "} < /
        div >
    );
};

export default AppointmentList;