import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigateToLogin = useNavigate();

    const updateFormData = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitRegistration = async (event) => {
        event.preventDefault();
        try {
            const apiURL = `${process.env.BACKEND_URL}/api/registrar`;
            const response = await axios.post(apiURL, formData, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Nuevo usuario registrado:", response.data);
            navigateToLogin("/login");
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <section className="container mt-5">
            <header>
                <h2>Crear Cuenta</h2>
            </header>
            <form onSubmit={submitRegistration}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={updateFormData}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={updateFormData}
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Registrarse</button>
            </form>
        </section>
    );
};

export default Register;
