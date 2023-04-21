import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfession } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQualities";
import { validator } from "../../utils/validator";
import CheckBoxField from "../form/CheckBoxField";
import MultiSelectField from "../form/MultiSelectField";
import RadioField from "../form/RadioField";
import SelectField from "../form/SelectField";
import TextField from "../form/TextField";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const { signUp } = useAuth();
    const { qualities } = useQualities();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const { professions } = useProfession();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная поста обязательна для заполнения"
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
        },
        profession: {
            isRequired: { message: "Обязательно выберите Вашу профессию" }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await signUp(newData);
            navigate("/");
        } catch (error) {
            setErrors(error);
        }
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
            <SelectField
                label="Выберите Вашу профессию"
                value={data.profession}
                defaultOption="Choose..."
                options={professionsList}
                onChange={handleChange}
                name="profession"
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите пол"
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите качества"
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить лицензионное соглашение
            </CheckBoxField>
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

export default RegisterForm;
