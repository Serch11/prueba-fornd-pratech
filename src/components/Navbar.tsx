import React, { useEffect, useState } from 'react';
import { Button, Nav } from 'react-bootstrap'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import '../assets/Styles/navbar.css';
import axios from 'axios'


const Inicio = (props: any) => {
    
    let token = localStorage.getItem("token");
    return (
        <Link to="/" style={{ textDecoration: "none" }} id="login">
            {!token ? <li>Iniciar Session</li> : ""}
        </Link>
    )
}


const Cerrar = () => {
    let token = localStorage.getItem('token');
    return (
        <Link to="/logout" style={{ textDecoration: "none" }} id="logout">
            {token ? <li>Logout</li> : ""}
        </Link>
    )
}


const Usuario = () => {
    let token = localStorage.getItem('token');
    console.log(token)
    return (
        <Link to="/info-usuario" style={{ textDecoration: "none" }} id="info-usuario" >
            {token ? <li>Usuario</li> : ""}
        </Link>
    )
}


const Registro = () => {
    let token = localStorage.getItem('token');
    return (
        <Link to="/registrarse" style={{ textDecoration: "none" }} id="registrarse" >
            {token ? "" : <li>Registrarse</li>}
        </Link>
    )
}

const Listado = () => {
    let token = localStorage.getItem('token');
    return (
        <Link to="/listadoUsuarios" style={{ textDecoration: "none" }} id="listadoUsuarios" >
            {token ? <li>Lista Usuarios</li> : ""}
        </Link>
    )
}







export { Inicio };
export { Cerrar };
export { Usuario };
export { Registro };
export { Listado };