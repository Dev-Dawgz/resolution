import React, { useEffect, useState } from "react";
import OverviewConflict from "./OverviewConflict.jsx";
import axios from "axios";

function Overview() {
    const [allConflicts, updateAllConflicts] = useState([])

    function getAllConflicts() {
        axios.get('/conflict/api/getAllConflicts')
        .then((results) => {
            const conflicts = [...results]
            console.log(results)
            updateAllConflicts(allConflicts)
        })
    }

    useEffect(() => {
        getAllConflicts()
    }, [])

    return (
        <div>
            <h1 className="wof-component">Overview</h1>
            <br />
            <div>
                <h2>Opened Conflicts:</h2>
                <br />
                {
                    allConflicts.map((conflict) => {
                        <OverviewConflict conflictType={conflict.conflictType} opponentYouWhacked={conflict.opponentYouWhacked}/>
                    })
                }
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