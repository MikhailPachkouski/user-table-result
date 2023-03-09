import React, { useEffect, useState } from "react";
import TextField from "../form/TextField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../form/CheckBoxField";

// import { object, string } from "yup";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    // const validateSchema = object({
    //     email: string().required("Электронная почта обязательна для заполнения").email("Email введен некорректно"),
    //     password: string().required("Пароль обязателен для заполнения").matches(/(?=.*[A-Z])/, "Пароль должен иметь хотя бы одну заглавную букву").matches(/(?=.*[0-9])/, "Пароль должен содержать цифры")
    // });
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен иметь хотя бы одну заглавную букву"
            },
            isContainDigit: { message: "Пароль должен содержать цифры" },
            min: {
                message: "Пароль должен быть не менее 8 символов",
                value: 8
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        // validateSchema.validate(data).then(() => setErrors({})).catch((error) => setErrors({ [error.path]: error.message }));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
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
            <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">Оставаться в системе</CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
