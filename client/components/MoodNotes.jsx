import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CalmingMethod from './CalmingMethod.jsx';
import axios from 'axios';

const MoodNotes = () => {
  const [rating, setRating] = useState(4);
  const [postRating, setPostRating] = useState(7);

  const [reason, setReason] = useState('');
  const [postReason, setPostReason] = useState('');

  const [meditationName, setMeditationName] = useState('');


  const handleRatingChange = (event) => {
    let currRating = parseInt(event.target.value);
    if (currRating < 1) {
      currRating = 1;
    } else if (currRating > 10) {
      currRating = 10;
    }
    setRating(currRating);
  };

  const handlePostRatingChange = (event) => {
    let currRating = parseInt(event.target.value);
    if (currRating < 1) {
      currRating = 1;
    } else if (currRating > 10) {
      currRating = 10;
    }
    setPostRating(currRating);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handlePostReasonChange = (event) => {
    setPostReason(event.target.value);
  };

  const handleMeditationNameChange = (selected) => {
    setMeditationName(selected);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newMoodNote = {
      acRating: rating,
      acReason: reason,
      meditationName: meditationName,
      reflectRating: postRating,
      reflectReason: postReason
    };

    // help from team || needed to double up on 'mood'
    axios.post('/mood/mood', newMoodNote)
      .then(() => {
        console.log('Note submitted');
      })
      .catch((error) => {
        console.error('Error submitting note', error);
      });
  };

  return (
    <div className="wof-component container">
      <h1 className="text-primary">MoodNotes</h1>
      <h5>Acknowledge</h5>
      <Form>
        <Form.Group controlId="range">
          <p>Rating: {rating}</p>
          <Form.Range
            value={rating}
            onChange={handleRatingChange}
            min="1"
            max="10"
          />
        </Form.Group>
      </Form>
      <textarea
        value={reason}
        onChange={handleReasonChange}
        placeholder="What contributed to this feeling?"
      />
      <CalmingMethod changeMedName={handleMeditationNameChange} />

      <h5>Reflect</h5>
      <Form>
        <Form.Group controlId="range">
          <p>Rating: {postRating}</p>
          <Form.Range
            value={postRating}
            onChange={handlePostRatingChange}
            min="1"
            max="10"
          />
        </Form.Group>
      </Form>
      <textarea
        value={postReason}
        onChange={handlePostReasonChange}
        placeholder="Reflection or notes..."
      />
      <button type="submit" onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

export default MoodNotes;
