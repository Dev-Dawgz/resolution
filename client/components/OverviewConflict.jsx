import React from "react";
import Card from 'react-bootstrap/Card';


function OverviewConflict(props) {

    if(props.conflictType === 'whack'){
        return (
            // <div >
            //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium quasi magni explicabo sit officiis, perspiciatis, doloremque praesentium quos reprehenderit illum earum distinctio incidunt sunt quia.</p>
            //     <button>{props.closeButton} Conflict</button>
            // </div>
            <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Whack Conflict</Card.Title>
          <Card.Text>
          You took a wild jab at {props.opponentYouWhacked}
        </Card.Text>
      </Card.Body>
    </Card>
        )
    }
}

export default OverviewConflict;