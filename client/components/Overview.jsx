import React, { useEffect, useState } from "react";
import OverviewConflict from "./OverviewConflict.jsx";
import ClosedConflict from "./closedConflicts.jsx";

import axios from "axios";

function Overview() {
    const [allConflicts, updateAllConflicts] = useState([])

    function getAllConflicts() {
        axios.get('/conflict/api/getAllConflicts')
        .then((results) => {
            const conflicts = [...results.data]
            console.log(conflicts)
            updateAllConflicts(conflicts)
        })
    }



    useEffect(() => {
        getAllConflicts()
    }, [allConflicts])

    return (
        <div className="wof-component container">
            <h1 className="text-primary" >Overview</h1>
            <br />
            <div>
                <h2 >Opened Conflicts:</h2>
                <br />
                {
                    <OverviewConflict allConflictsProps={allConflicts} />
                }
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
                {
                    < ClosedConflict allConflictsProps={allConflicts} />
                }
            </div>
        
        </div>
    )
}

export default Overview;