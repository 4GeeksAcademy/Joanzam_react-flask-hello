import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivatePage = () => {
    const navigateTo = useNavigate();

    const verifyToken = () => {
        const authToken = sessionStorage.getItem("token");
        if (!authToken) {
            navigateTo("/login");
        }
    };

    useEffect(() => {
        verifyToken();
    }, []); // Dependencia vacía para que solo se ejecute una vez al montar el componente

    const logoutUser = () => {
        sessionStorage.clear(); // Limpia toda la sesión (incluido el token)
        navigateTo("/login");
    };

    return (
        <section className="container mt-5">
            <header>
                <h2>Zona Segura y Privada</h2>
            </header>
            <main>
                <p>Has accedido correctamente a esta área privada. Muchas gracias por iniciar sesión.</p>
                <button className="btn btn-danger" onClick={logoutUser}>
                    Salir
                </button>
            </main>
        </section>
    );
};

export default PrivatePage;
