import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime/runtime";

const UserRegister = () => {
  const [users, setUsers] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  //get users
  const getUsers = async () => {
    const response = await axios.get("http://localhost:3001/api/users");
    setUsers(response.data);
  };

  //check username
  const onValidUsername = (val) => {
    const usernameRegex = /.+\@.+\..+/;
    return usernameRegex.test(val);
  };

  //user register
  let userRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    let user = users.find((u) => u.username === username);
    if (user) {
      setMessage("This login already in use");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      if (!onValidUsername(username)) {
        setMessage(
          "Invalid login,login must be as valid e-mail(test@gmail.com"
        );
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } else {
        try {
          await axios.post("http://localhost:3001/api/users", {
            username,
            password,
          });
          setUsername("");
          setPassword("");
          navigate("/");
        } catch (error) {
          console.log(JSON.stringify(error.message));
        }
      }
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
            <button class="button is-success" onClick={userRegister}>
              {" "}
              Register{" "}
            </button>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UserRegister;
