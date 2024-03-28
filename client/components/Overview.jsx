import React from "react";
import OverviewConflict from "./OverviewConflict.jsx";

function Overview() {

    return (
        <div>
            <h1 className="wof-component">Overview</h1>
            <br />
            <div>
                <h2>Opened Conflicts:</h2>
                <br />
                <OverviewConflict closeButton="Close"/>
                <OverviewConflict closeButton="Close"/>
                <OverviewConflict closeButton="Close"/>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <h2>Closed Conflicts:</h2>
                <br />
                <OverviewConflict closeButton="Reopen"/>
                <OverviewConflict closeButton="Reopen"/>
                <OverviewConflict closeButton="Reopen"/>
                <OverviewConflict closeButton="Reopen"/>
            </div>
        
        </div>
    )
}

export default Overview;