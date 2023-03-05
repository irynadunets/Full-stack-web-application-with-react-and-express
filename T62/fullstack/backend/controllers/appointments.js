const appointmentsRouter = require("express").Router();
const Appointment = require("../models/appointment");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    return null;
};
//get appointments router
appointmentsRouter.get("/api/appointments", (request, response) => {
    Appointment.find({})
        .then((appointments) => {
            response.json(appointments);
        });
});
//get appointment by id
appointmentsRouter.get("/api/appointments/:id", async(request, response) => {
    const appointment = await Appointment.findById(request.params.id);
    if (appointment) {
        response.json(appointment);
    } else {
        response.status(404).end();
    }
});
//add appointment
appointmentsRouter.post("/api/appointments", async(request, response) => {
    const body = request.body;
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, "secretKey");
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    let appointment = new Appointment({
        patient: body.patient,
        date: body.date,
        doctor: body.doctor,
        category: body.category
    });

    const savedAppointment = await appointment.save();
    await appointment.save();

    response.json(savedAppointment);
});
//edit appointment 
appointmentsRouter.put("/api/appointments/:id", (request, response, next) => {
    const body = request.body;

    const appointment = {
        patient: body.patient,
        date: body.date,
        doctor: body.doctor,
        category: body.category
    };

    Appointment.findByIdAndUpdate(request.params.id, appointment, { new: true })
        .then((updatedAppointment) => {
            return updatedAppointment.toJSON();
        })
        .then((updatedAndFormattedAppointment) => {
            response.json(updatedAndFormattedAppointment);
        })
        .catch((error) => next(error));
});
//delete appointment
appointmentsRouter.delete("/api/appointments/:id", async(request, response, next) => {
    try {
        await Appointment.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

module.exports = appointmentsRouter;