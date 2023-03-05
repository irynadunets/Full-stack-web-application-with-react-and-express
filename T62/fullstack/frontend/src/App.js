import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentList from "./components/AppointmentLIst";
import AppointmentLIstPatients from "./components/AppointmentLIstPatients";
import AddAppointment from "./components/AddAppointment";
import EditAppointment from "./components/EditAppointment";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";

function App() {
    return ( <
        BrowserRouter >
        <
        div className = "container" >
        <
        Routes >
        <
        Route path = "/"
        element = { < UserLogin / > }
        />{" "} <
        Route path = "/api/users"
        element = { < UserRegister / > }
        />{" "} <
        Route path = "/api/appointments"
        element = { < AppointmentList / > }
        />{" "} <
        Route path = "/api/appointments_patients"
        element = { < AppointmentLIstPatients / > }
        />{" "} <
        Route path = "/api/appointments/add"
        element = { < AddAppointment / > }
        />{" "} <
        Route path = "/api/appointments/edit/:id"
        element = { < EditAppointment / > }
        />{" "} <
        /Routes>{" "} <
        /div>{" "} <
        /BrowserRouter>
    );
}

export default App;