import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { UsuarioEliminado } from './Loading'

const Table = (props: any) => {

    const history = useHistory();

    const [newdelete, setDelete] = useState(false);

    console.log(props)
    console.log(props.data.email)

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
                    setDelete(true)
                    setTimeout(() => {
                        history.push("/listadoUsuarios")
                    }, 1000)
                    console.log(data)
                }).catch((err) => {
                    console.log(err)
                })
            }

        } else {
            window.alert("Usuario no eliminado")
        }

    }

    return (
        <>
            {  newdelete ? <div className="alerta"> <UsuarioEliminado /> </div> : ""}
            <table className="table table-bordered table">
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
                <tbody>
                    <tr>
                        <th>{props.data.cedula}</th>
                        <th>{props.data.nombres}</th>
                        <th>{props.data.email}</th>
                        <th>{props.data.genero}</th>
                        <th>
                            <button className="btn btn-danger" style={{ padding: "10px", margin: "10px" }} type="button" onClick={(e) => deleteUsuario(props.data._id, e)}>Eliminar</button>
                            <Link className="btn btn-primary" style={{ padding: "10px", margin: "10px" }} to={`/registrarse/${props.data._id}`}>Editar</Link>
                        </th>

                    </tr>
                </tbody>
            </table>
        </>
    )
}
export { Table };