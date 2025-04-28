import React from "react";

export default function Profile(prop)
{
    console.log(prop)

    return (

        <div>
            <h1>Hello {prop.name}</h1>
            <h2>Email{prop.email}</h2>
            <h3>{prop.other.address}</h3>

            <button onClick={()=> prop.setname('harry')}>Change Name</button>
            
        </div>
    )
}