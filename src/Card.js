import React from "react";


const Card = ({name, image}) =>{

    return (
        <img 
        className="Card"
        alt={name}
        src={image}
        style={{
            width: '5vh',
            height: '10vh'
        }}
        />
    )

}

export default Card