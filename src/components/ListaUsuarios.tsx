import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Styles/listaUsuarios.css'
import { Link, useParams, Route, useHistory } from 'react-router-dom';
import { Table } from './Table'

const ListaUsuarios = () => {

    let history = useHistory();

    var UserBuscado: any = {
        nombres: "",
        email: "",
        cedula: "",
        password: "",
        genero: ""
    };

    const [newUser, setNew] = useState(false);
    const [seachUser, setSearch] = useState({
        cedula: ""
    })
    const [table, setTable] = useState([])

    function hanldleChange(event: any): void {
        ///console.log(event)
        setSearch({
            ...seachUser,
            [event.target.name]: event.target.value

        })
        //console.log(seachUser)
    }



    setTimeout(() => {
        //window.location.reload();
    }, 0)
    var Data: any[];

    const deleteUsuario = (id: any, event: any) => {
        console.log(event)
        let tr: any = event.nativeEvent.path[2];
        console.log(tr)
        let res = window.confirm("esta seguro de eliminar este usuario ?");
        //console.log(res)
        if (res) {
            let token = localStorage.getItem('token');

            if (id) {
                axios.delete(`http://localhost:5001/delete/${id}`, {
                    headers: { "Authorization": token }
                }).then((data) => {
                    tr.style.display = "none";

                    Data = listUsuarios;
                }).catch((err) => {
                    console.log(err)
                })
            }

        } else {
            window.alert("Usuario no eliminado")
        }

    }



    const [listUsuarios, setUsuarios] = useState([])

    function data(data: any) {
        return data;
    }

    const buscarUser = (e: any) => {
        console.log(seachUser)
        e.preventDefault();
        if (seachUser) {
            fetch(`http://localhost:5001/usuario-cedula/${seachUser.cedula}`)
                .then((data) => data.json())
                .then((data) => {
                    //console.log(data.user);
                    let tabla: any = document.getElementById("table-body");
                    let tablat: any = document.getElementById("tabla-total");
                    tablat.style.display = "none";
                    tabla.style.display = "none";
                    UserBuscado.email = data.user.email;
                    UserBuscado.nombres = data.user.nombres;
                    UserBuscado.genero = data.user.genero;
                    UserBuscado.password = data.user.password;
                    UserBuscado.cedula = data.user.cedula
                    setNew(true)
                    setTable(data.user)
                    console.log(UserBuscado)



                }).catch((err) => {
                    console.log(err)
                })
        } else {
            alert("Error al ingresar los datos")
        }
        return newUser;
    }






    useEffect(() => {

        let token = window.localStorage.token
        console.log(token)
        if (token) {
            fetch("http://localhost:5001/lista-usuarios", {
                headers: { "Authorization": token }
            }).then(data => data.json())
                .then((data) => {
                    //console.log(data.usuarios)
                    Data = data.usuarios;
                    setUsuarios(data.usuarios)

                    //console.log(Data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }, []);


    Data = listUsuarios;



    return (
        <div className="listUsuarios">
            <div className="row">
                <div className="col-md-8">
                    <div>
                        <h1 className="title-list">Bienvenido  la lista de usuarios</h1>

                        <table className="table  table-bordered tbl-lista" id="tabla-total">

                            <thead>
                                <tr>
                                    <th>Cedula</th>
                                    <th>Nombres</th>
                                    <th>Correo</th>
                                    <th>Genero</th>
                                    <th>
                                        Acciones
                            </th>
                                </tr>
                            </thead>
                            <tbody id="table-body">
                                {
                                    Data.map((value, index) =>
                                        <tr key={value._id}>

                                            <td>{value.cedula}</td>
                                            <td>{value.nombres}</td>
                                            <td>{value.email}</td>
                                            <td>{value.genero}</td>
                                            <td>
                                                <button className="btn btn-danger" style={{ padding: "10px", margin: "10px" }} type="button" onClick={(e) => deleteUsuario(value._id, e)}>Eliminar</button>

                                                <Link className="btn btn-primary" style={{ padding: "10px", margin: "10px" }} to={`/registrarse/${value._id}`}>Editar</Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        {
                            !newUser ? "" : <Table data={table} />
                        }

                    </div>
                </div>
                <div className="col-md-4">
                    <form className="form-buscar" onSubmit={buscarUser}>

                        <br />
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fa fa-id-card"></i>
                                    </div>
                                </div>
                                <input type="text" placeholder="N° de Indentificacion" name="cedula" id="cedula" className="form-control"
                                    required pattern="[0-9]{1,10}" onChange={hanldleChange}
                                    title="escriba su cedula de forma adecuada solo se aceptan numeros" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary form-control" style={{backgroundColor:"#b5172f"}}>Buscar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ListaUsuarios;