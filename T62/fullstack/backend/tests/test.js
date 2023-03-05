const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index")
const agent = request.agent(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/* Connecting to the database before each test. */
beforeEach(async() => {
    await mongoose.connect('mongodb+srv://Ira:Espo2016!@hyperion-dev-1234.kne6jxm.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

let token = '';
//login as admin test
beforeAll(async() => {
    const hashedPassword = await bcrypt.hash("admin", 1);
    const response = await request(app)
        .post("/api/login")
        .send({
            username: "admin@gmail.com",
            password: "admin"
        });

    // the token for future requests
    const token = response.body.token;
});
//get all appointments
describe("GET /admin success", () => {
    it("should return all appointments", async() => {
        const res = await request(app).get("/api/appointments").send({ _token: token });
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
//get appointment by id
describe("GET /api/appointments/:id", () => {
    it("should return a appointment", async() => {
        const res = await request(app).get(
            "/api/appointments/63ff85aae4a49ed4c1741924"
        ).send({ _token: token });
        expect(res.statusCode).toBe(200);
        expect(res.body.patient).toBe("Ricardo S.");
        expect(res.body.date).toBe("2023-03-24");
        expect(res.body.doctor).toBe("Dr. Peter Parker");
        expect(res.body.category).toBe("New symptoms visit");
    });
});
//delete appointment
describe("DELETE /api/appointments/:id", () => {
    it("should delete a appointment", async() => {
        const res = await request(app).delete(
            "/api/appointments/640265d2304d03997dc3a50b"
        ).send({ _token: token });
        expect(res.statusCode).toBe(204);
    });
});