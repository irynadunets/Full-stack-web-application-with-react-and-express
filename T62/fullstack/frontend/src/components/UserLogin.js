import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//user login
const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Message, setMessage] = useState("");

  const navigate = useNavigate();

  let userLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", user.data.token);
      setUsername("");
      setPassword("");
      username === "admin@gmail.com"
        ? navigate("/api/appointments")
        : navigate("/api/appointments_patients");
    } catch (error) {
      setMessage("Invalid login or password");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div class="columns is-mobile is-centered">
      <div class="column is-one-third">
        <h1 class="title"> Medical Appointment App </h1>{" "}
        {Message && (
          <article class="message is-danger">
            <div class="message-body"> {Message} </div>{" "}
          </article>
        )}{" "}
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"> </i>{" "}
            </span>{" "}
            <span class="icon is-small is-right">
              <i class="fas fa-check"> </i>{" "}
            </span>{" "}
          </p>{" "}
        </div>{" "}
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <span class="icon is-small is-left">
              <i class="fas fa-lock"> </i>{" "}
            </span>{" "}
          </p>{" "}
        </div>{" "}
        <div class="field">
          <p class="control">
            <button
              class="button is-success"
              onClick={(event) => userLogin(event)}
            >
              {" "}
              Login{" "}
            </button>{" "}
          </p>{" "}
        </div>{" "}
        <div class="title is-6">
          {" "}
          Do not have account ?{" "}
          <button
            class="button is-ghost"
            onClick={() => navigate("/api/users")}
          >
            {" "}
            Register{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UserLogin;

