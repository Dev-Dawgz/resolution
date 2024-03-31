import React from "react";
import Card from 'react-bootstrap/Card';


function OverviewConflict(props) {

    if(props.conflictType === 'whack'){
        return (
            <Card className="wof-component container" >
      <Card.Body>
        <Card.Title>Whack Conflict</Card.Title>
          <Card.Text>
          You took a wild jab at {props.opponentYouWhacked}
        </Card.Text>
      </Card.Body>
    </Card>
        )
    }

    if(props.conflictType === 'meme') {
        return (
        <Card className="wof-component container" >
            <Card.Body>
                <Card.Title>Meme Conflict</Card.Title>
                <Card.Text>
                You left {props.opponentYouWhacked} with a {props.posOrNeg} meme message!
                </Card.Text>
            </Card.Body>
        </Card>
        )
    }

    if(props.conflictType === 'HateMail') {
        return (
        <Card className="wof-component container" >
            <Card.Body>
                <Card.Title>HateMail Conflict</Card.Title>
                <Card.Text>
                You left {props.opponentYouWhacked} with a hateful message stating, '{props.hatespeech}'!
                </Card.Text>
            </Card.Body>
        </Card>
        )
    }
}

export default OverviewConflict;