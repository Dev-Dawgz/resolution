import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MoodMemos = () => {
  const [moodMemos, setMoodMemos] = useState([]);

  useEffect(() => {
    
    // GET all MoodMemos user has and display the most recent first
    axios
      .get('/mood/mood')
      .then((response) => {
        setMoodMemos(response.data.reverse()); 
      })
      .catch((error) => {
        console.error('Error fetching mood memos:', error);
      });
  }, []);

  // DELETE function removes data (which removes memo)
  const handleDeleteMemo = (id) => {
    axios
      .delete(`/mood/mood/${id}`)
      .then(() => {
        setMoodMemos(moodMemos.filter((memo) => memo.id !== id));
        console.log('Mood memo deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting mood memo:', error);
      });
  };

  return (
    <div className="wof-component container">
      <h1 className="text-primary">MoodNotes</h1>
      <Link to="/MoodNotes" className="btn btn-primary">
        MoodNotes
      </Link>
      {moodMemos && moodMemos.length > 0 ? (
        moodMemos.map((memo) => (
          <Card
            key={memo.id}
            className="my-3"
            style={{ backgroundColor: '#adcdff' }}
          >
            <Card.Body>
              <Card.Title>Acknowledgment Rating: {memo.acRating}</Card.Title>
              <Card.Text>Reason: {memo.acReason}</Card.Text>
              <Card.Title>
                Meditation Method Used: {memo.meditationName}
              </Card.Title>
              <Card.Title>Reflect Rating: {memo.reflectRating}</Card.Title>
              <Card.Text>Thoughts: {memo.reflectReason}</Card.Text>
              <ListGroup style={{ backgroundColor: '#adcdff' }}>
                {/* figure out how to change group color */}
                <ListGroup.Item>Created: {memo.createdAt}</ListGroup.Item>
              </ListGroup>
              <Button
                style={{ backgroundColor: '#ff0000' }}
                onClick={() => handleDeleteMemo(memo.id)}
              >
                Delete Memo
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h2> No mood memos yet. Go get to reflecting!</h2>
      )}
    </div>
  );
};

export default MoodMemos;
