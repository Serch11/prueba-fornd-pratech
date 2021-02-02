import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useParams } from 'react-router-dom'
import '../assets/Styles/navbar.css';
import App from '../App';
import Login from './Login'
import Registrarse from './Registrarse';
import ListaUsuarios from './ListaUsuarios';
import InfoUsuario from './InfoUsuario';
import { Inicio } from './Navbar';
import { Cerrar, Registro, Usuario, Listado } from './Navbar';


const Header = (props: any) => {

    console.log(props)
    let prueba = 1;

    const [loginTrue, setloginTrue] = useState(false);
    const [cerrar, setCerrar] = useState(true);

    console.log(loginTrue)
    var token;

    useEffect(() => {


        token = localStorage.getItem('token');

        if (token) {
            setloginTrue(true)
        } else {
            setloginTrue(false)
        }
    })


    const Logout = () => {
        localStorage.removeItem('token');
        return <Redirect to="/" />
    }

    const loggin = () => {

        let token = localStorage.getItem('token');

        if (token === null) {
            return false;
        } else {
            return true;
        }


    }

    console.log(loggin())
    return (
        <div className="header">

            <Router>
                <div className="nav">
                    <nav className="navbar">
                        <div className="welcome">
                            <div id="img">
                                    <img src="https://images.prismic.io/pratech-sitio-web/1dafe668-d352-40ec-9d28-f9f4dd363813_logo.png?auto=compress,format" alt="no hay"/>
                            </div>
                </div>
                        <div className="sessiones">

                            {<Inicio />}
                            {<Cerrar />}
                            {<Registro />}
                            {<Listado />}


                        </div>
                    </nav>
                </div>
                <Switch>
                    <Route exact path="/" component={Login} checked={true}>

                    </Route>
                    <Route exact path="/registrarse/:id?" component={Registrarse} />
                    <Route path="/listadoUsuarios" component={ListaUsuarios} />
                    <Route path="/logout" component={Logout} />
                    <Route exact path="/info-usuario/:id" component={InfoUsuario} />

                    <Route exact path="/">
                        {loggin() ? <Redirect to="/listadoUsuarios" /> : <Redirect to="/ " />}
                    </Route>

                    {/* {isLoggin} ? <Redirect to="/listadoUsuarios" /> : <Redirect to="/" /> */}
                </Switch>
            </Router>
        </div >
    )
}
export default Header;