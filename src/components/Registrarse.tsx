import React, { useState, useEffect } from 'react';
import FormDinamico from './FormDinamico';



const Registrarse = (props:any) => {

    // , {
    //     headers: {
    //         "Authorization": "Bearer TOKEN"
    //     }
    // }
    
    const {match} = props;
    console.log(props)
    let id = match.params.id;

    return (
        <div className="registrarse">
            
            <FormDinamico  to={id}/>

        </div>
    )
}

export default Registrarse;