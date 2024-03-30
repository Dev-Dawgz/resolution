import React from "react";

function OverviewConflict(props) {

    return (
        // if(props.conflictType === '')
        <div style={{border: "10px green "}}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium quasi magni explicabo sit officiis, perspiciatis, doloremque praesentium quos reprehenderit illum earum distinctio incidunt sunt quia.</p>
            <button>{props.closeButton} Conflict</button>
        </div>
    )
}

export default OverviewConflict;