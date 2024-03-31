import React, { useEffect, useState } from "react";
import OverviewConflict from "./OverviewConflict.jsx";
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
    }, [])

    return (
        <div className="wof-component">
            <h1 className="text-primary" >Overview</h1>
            <br />
            <div>
                <h2 >Opened Conflicts:</h2>
                <br />
                {/* <button onClick={() => {
                    getAllConflicts()
                }}>hello</button> */}
                {
                    allConflicts.map((conflict) => {
                        return (
                            <OverviewConflict hateSpeech={conflict.hateSpeech} posOrNeg={conflict.positiveOrNegativeMeme} conflictType={conflict.conflictType} opponentYouWhacked={conflict.opponentYouWhacked}/>
                        )
                    })
                }
                <OverviewConflict />
                <OverviewConflict />
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
                <OverviewConflict />
                <OverviewConflict />
                <OverviewConflict />
                <OverviewConflict />
            </div>
        
        </div>
    )
}

export default Overview;