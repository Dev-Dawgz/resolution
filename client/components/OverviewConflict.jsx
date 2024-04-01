import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import axios from "axios";

function OverviewConflict(props) {


    function updateConflict(id) {
        axios.patch(`/conflict/api/updateStatus`, {
            id: id,
            conflictStatus: "closed"
        })
        .then(() => {
        })
    }


    useEffect(() => {

    }, [])
    
    
    return props.allConflictsProps?.map((conflict) => {

        if(conflict.conflictStatus === 'open'){
            if(conflict.conflictType === 'whack'){
                return (
                    <Card >
              <Card.Body>
                <Card.Title>Whack Conflict</Card.Title>
                  <Card.Text>
                  You took a wild jab at {conflict.opponentYouWhacked}
                  <br />
                  <button className='btn btn-primary' onClick={() => {
                            updateConflict(conflict.id)
                        }}> Close Conflict ❌</button>
                </Card.Text>
              </Card.Body>
            </Card>
                )
            }
        
            if(conflict.conflictType === 'meme') {
                return (
                <Card  >
                    <Card.Body>
                        <Card.Title>Meme Conflict</Card.Title>
                        <Card.Text>
                        You left {conflict.opponentYouWhacked} with a {conflict.positiveOrNegativeMeme} meme message!
                        <br />
                        <button className='btn btn-primary' onClick={() => {
                            updateConflict(conflict.id)
                        }}> Close Conflict ❌</button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                )
            }
        
          if(conflict.conflictType === 'HateMail') {
                return (
                <Card  >
                    <Card.Body>
                        <Card.Title>HateMail Conflict</Card.Title>
                        <Card.Text>
                        You left samantha1234 with a hateful message stating, "{conflict.hateSpeech}"!
                        <br />
                        <button className='btn btn-primary' onClick={() => {
                            updateConflict(conflict.id)
                        }}> Close Conflict ❌</button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                )
            }

        }
    })

}



export default OverviewConflict;