import React from 'react';


const InfoUsuario = (props:any) => {

    const {match} = props;
    return (
        <div className="infoUsuario">
            {match.params.id}
            <h1>Infomacion del usuario</h1>
        </div>
    )
}


export default InfoUsuario;