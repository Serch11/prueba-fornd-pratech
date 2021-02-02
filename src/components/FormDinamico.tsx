import React, { useEffect, useState } from 'react';
import '../assets/Styles/formDinamico.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AlertSucces } from './Loading';

import axios from 'axios';

function FormDinamico(props: any) {

    let history = useHistory();
    const [alertSuccess, setAlertSuccess] = useState(false);
    let id = props.to;

    const Data = {
        email: "",
        password: "",
        nombres: "",
        cedula: "",
        genero: ""
    }
    const { register, handleSubmit, errors, watch } = useForm();

    const [useData, setUseData] = useState({
        email: "",
        password: "",
        nombres: "",
        cedula: "",
        genero: ""
    });



    const onHandleChange = (event: any) => {

        setUseData({
            ...useData,
            [event.target.name]: event.target.value
        })
    }


    const Registrar = async () => {

        let token = localStorage.getItem('token');

        if (id) {
            //alert("actualiza datos")
            let form: any = document.getElementById("formulario")
            let email: any = document.getElementById("email");
            let nombre: any = document.getElementById("nombres");
            let identificacion: any = document.getElementById("cedula");
            let genero: any = document.getElementById("select-genero");
            let password: any = document.getElementById("password");

            Data.email = email.value;
            Data.nombres = nombre.value;
            Data.password = password.value;
            Data.cedula = identificacion.value;
            Data.genero = genero.value;
            console.log(Data)

            if (Data) {
                console.log("Entro en la peticion")
                axios.put(`http://localhost:5001/update/${id}`, Data, {
                    headers: { "Authorization": token }
                }).then(data => {
                    form.reset();
                    console.log(data)
                    setAlertSuccess(true)
                    setTimeout(() => {
                        history.push("/listadoUsuarios");
                    }, 2000);
                }).catch(err => {
                    console.log(err)
                })
            }
        } else {
            alert("crea un nuevo usuario")
            console.log(useData)

            axios.post("http://localhost:5001/crear-usuario", useData)
                .then((data) => {
                    console.log(data)
                    if (data.data.ok === false) {
                        alert("El usuario existe")
                    }
                    if (data.data.ok === true) {

                        setAlertSuccess(true);
                        setTimeout(() => {
                            history.push("/");
                        }, 2000)
                        // alert("Usuario creado con exito")
                    }
                }).catch((err) => {
                    console.log(err)
                    console.log("Hubo un error al mandar los datos " + err)
                })
        }


    }


    useEffect(() => {

        if (id) {
            //alert("hay una id");
            let token = localStorage.getItem('token');
            let title: any = document.getElementById("title-form");
            let btn: any = document.getElementById("btn-form");
            let password: any = document.getElementById("password");
            password.disabled = true;
            btn.textContent = "Actualizar"
            title.textContent = "Actualizar Usuario";
            if (token) {
                axios.get(`http://localhost:5001/lista-usuario/${id}`, {
                    headers: { "Authorization": token }
                }).then((data) => {
                    let user = data.data.usuario;
                    console.log(user);
                    let email: any = document.getElementById("email");
                    let nombre: any = document.getElementById("nombres");
                    let identificacion: any = document.getElementById("cedula");
                    let password: any = document.getElementById("password");
                    let select: any = document.getElementById("select-genero")
                    email.value = user.email;
                    nombre.value = user.nombres;
                    identificacion.value = user.cedula;
                    password.value = user.password;
                    select.value = user.genero;

                })
            }
        } else {
            console.log("no hay id");
        }

        console.log(props)

    }, [])

    return (
        <div className="registro">
            <div className="alerta">
                {alertSuccess ? <AlertSucces msn=" Accion exitosa" /> : ""}
            </div>
            <form onSubmit={handleSubmit(Registrar)} id="formulario">

                <h1 style={{ textAlign: "center", padding: "10px" }} id="title-form" >Registrar Usuario</h1>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-envelope"></i>
                            </div>
                        </div>
                        <input type="tex" className="form-control" name="email" id="email"
                            placeholder="Correo electronico" required
                            pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                            onChange={onHandleChange} title="Escriba el correo electronico valido" />
                    </div>

                </div>
                <div className="form-group" id="input-password">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-key"></i>
                            </div>
                        </div>
                        <input type="password" placeholder="Contraseña" name="password" id="password"
                            required className="form-control" pattern="[0-9]{1,10}" title="digite solo letras " onChange={onHandleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-user"></i>
                            </div>
                        </div>
                        <input type="text" placeholder="Nombre de Usuario" name="nombres" className="form-control"
                            required onChange={onHandleChange} pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$" id="nombres" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-id-card"></i>
                            </div>
                        </div>
                        <input type="text" placeholder="N° de Indentificacion" name="cedula" id="cedula" className="form-control"
                            required onChange={onHandleChange} pattern="[0-9]{1,10}"
                            title="escriba su cedula de forma adecuada solo se aceptan numeros" />
                    </div>
                </div>

                <div>
                    <label > Seleccione  genero </label><br />
                    <select className="form-select form-control" aria-label="Default select example" name="genero" required id="select-genero" onChange={onHandleChange}>
                        <option value="">Seleccione</option>
                        <option value="femenino">Femenino</option>
                        <option value="masculino">Masculino</option>

                    </select>
                </div>
                <div className="form-group m-lg-auto" style={{ alignItems: "center", width: "50%", marginTop: "25px" }}>
                    <button id="btn-form" className="btn btn-success form-control" style={{ alignItems: "center", marginTop: "25px" }}>Registrarse</button>
                </div>
            </form>
        </div>
    )

}

export default FormDinamico;