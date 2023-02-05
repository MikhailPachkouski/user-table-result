import React, { useState } from "react";
import TextField from "../components/TextField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    );
};

export default Login;
