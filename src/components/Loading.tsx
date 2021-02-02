import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {

    return (
        <ReactLoading type="spin" color="red" height="inherits" width="inherits" />
    )
}

const AlertSucces = (props: any) => {
    console.log(props)
    return (
        <div className="alert alert-success alerta" role="alert">
            <p>{props.msn}</p>
        </div>
    )
}

const AlertError = () => {
    return (
        <div className="alert alert-danger alerta" role="alert">
            Usuario o contraseña Incorrectos
        </div>
    )
}


const UsuarioEliminado = () =>{
    return (
        <div className="alert alert-danger alerta" role="alert">
            Usuario Eliminado con exito
        </div>
    )
}





export { Loading };
export { AlertSucces };
export { AlertError };
export {UsuarioEliminado};


