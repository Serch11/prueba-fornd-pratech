import React, { useState, useEffect } from 'react';
import '../assets/Styles/form.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Loading, AlertSucces, AlertError } from './Loading';



import { withRouter, Redirect, useHistory } from 'react-router-dom';




const Login = () => {

    let history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm();
    let isLoggin: boolean = false;
    let data: any;
    const [datos, setDatos] = useState({
        email: '',
        password: ''
    });
    const [token, setToken] = useState();
    const [userDate, setUserdDate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [btnEstado, setBtnEstado] = useState(true);
    const [alertError, setAlertError] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState(false);



    async function Login() {

        setBtnEstado(false)
        setLoading(true)
        let btn: any = document.getElementById("guardar");
        btn.style.diabled = false;
        setTimeout(async () => {
            let res = await axios.post("http://localhost:5001/login", datos).catch((err) => {

                //console.log(err)
                setLoading(false)
                setBtnEstado(true)
                setTimeout(() => {
                    setAlertError(true);
                    setTimeout(() => {
                        setAlertError(false);
                    }, 3000)
                }, 0)

            })

            data = await res;
            if (data) {

                //console.log(data.data.token)
                let token = data.data.token;
                if (token != undefined || token.length > 1) {
                    //console.log(token)
                    localStorage.setItem('token', token);
                    setUserdDate(data.data.usuario);
                    //console.log(userDate)

                    let result = isAuthenticated();
                    if (result) {
                        setAlertSuccess(true)
                        setLoading(false)
                        setTimeout(() => {
                            history.push("/listadoUsuarios");
                        }, 1000);
                    } else {
                        setAlertError(true)
                    }
                }
            }
        }, 1000)
    }
    function hanldleChange(event: any): void {
        ///console.log(event)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })

    }


    const isAuthenticated = () => {

        let miStorage = window.localStorage;
        //console.log(miStorage)
        if (miStorage.length > 0) {

            // console.log(miStorage.token)
            if (miStorage.token) return true;
        } else {
            console.log("no hay datos en el localstore")
            return false;
        }
    }

    useEffect(() => {





    });


    return (

        <div className="login">


            <div className="loading">
                {loading ? <Loading /> : ""}
            </div>
            <div className="alerta">

                {alertError ? <AlertError /> : ""}
            </div>
            <div className="alerta">
                {alertSuccess ? <AlertSucces msn="Login exitoso" /> : ""}
            </div>


            <form className="form" onSubmit={handleSubmit(Login)}>
                <h3>Iniciar Session</h3>
                <hr></hr>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-white">
                                <i className="fa fa-envelope"></i>
                            </div>
                        </div>
                        <input type="text" className="form-control" placeholder="Correo electronico"
                            onChange={hanldleChange} name="email" ref={register({ required: true })} />

                    </div>
                    <span className="span">{errors.email?.type === "required" && "Por favor ingrese un correo"}</span>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-white">
                                <i className="fa fa-key"></i>
                            </div>
                        </div>
                        <input type="password" className="form-control"
                            placeholder="Contraseña" onChange={hanldleChange} name="password"
                            ref={register({ required: true })} />
                    </div>
                    <span className="span">{errors.password?.type === "required" && "Por favor ingrese una contraseña"}</span>
                </div>
                <hr></hr>
                <div className="form-group box-btn">
                    <button type="submit" className="btn btn-success" id="guardar" disabled={!btnEstado}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;


