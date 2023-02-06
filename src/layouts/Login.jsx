import React, { useEffect, useState } from "react";
import TextField from "../components/TextField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная поста обязательна для заполнения"
            }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = {};
        for (const fieldForm in data) {
            if (data[fieldForm].trim() === "") {
                errors[fieldForm] = `${fieldForm} обязательное поле`;
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
