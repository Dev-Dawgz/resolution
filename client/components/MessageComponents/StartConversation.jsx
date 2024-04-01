import { React, useState } from 'react';
import axios from 'axios';
import Conversation from './Conversation.jsx';
import io from 'socket.io-client';
// import { post } from '../../../server/routes/conflictRouter.js';
const socket = io();

const StartConversation = (props) => {
  const { loggedIn, updateView, changePoints } = props;

  const [ topText, updateTopText ] = useState('');

  const [ bottomText, updateBottomText ] = useState('');

  const [ userExists, setUserExists ] = useState('');

  const [ noUserMessage, setNoUserMessage ] = useState('');

  const [ meme, changeMeme ] = useState('Aint-Nobody-Got-Time-For-That');

  const [ recipient, setRecipient ] = useState(null);

  //positive, negative, or neutral meme type
  const [posOrNeg, updatePosOrNeg] = useState('neutral')

  const getRecipient = (username) => {
    axios.get(`/messagesHandling/user${username}`)
      .then((res) => {
        if (res.status === 204 || username.length === 0) {
          setUserExists('user not found');
        } else if (res.status === 200) {
          setRecipient(res.data);
          setNoUserMessage('');
          // maybe put a check mark emoji
          setUserExists('all good');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMessage = () => {
    if (userExists === 'all good') {
      changePoints(loggedIn, 5);
      socket.emit('message', 'sending');
      axios.post('/messagesHandling/message', {
        senderId: loggedIn.id,
        recipientId: recipient.id,
        img: `https://apimeme.com/meme?meme=${meme}&top=${topText}&bottom=${bottomText}`.replaceAll(' ', '+')
      })
        .then((message) => {
          updateView(<Conversation
            convoId={message.data.conversationId}
            loggedIn={loggedIn}
            otherUser={recipient}
            updateView={updateView}
          />);

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setNoUserMessage('please enter valid username');
    }
  };


  const postConflict = () => {
    axios.post('/conflict/api/createConflict', {
      conflictType: "meme",
      positiveOrNegativeMeme: posOrNeg,
      opponentYouWhacked: recipient.username,
      conflictStatus: "open"
    })
    .then((results) => {
      console.log('successful post meme conflict')
      console.log(recipient)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <div>
      <br></br>
      <div style={{ width: '47%', float: 'left' }}>
        <h3 className='text-primary'>enter username to send to</h3>
        <input className="form-control form-control-lg" onChange={(e) => { getRecipient(e.target.value); }}></input>
        <br></br>
        <h5 className='text-primary'>{ userExists }</h5>
        <h3 className='text-primary'>select Meme</h3>
        <select id='memes' onChange={(e) => { changeMeme(e.target.value); }}>
          <option value='Aint-Nobody-Got-Time-For-That'>Ain't Nobody Got Time For That</option>
          <option value='Angry-Baby'>Angry Baby</option>
          <option value='Confused-Granddad'>Confused Granddad</option>
          <option value='Finn-The-Human'>Finn The Human Rage</option>
          <option value='Gasp-Rage-Face'>Gasp Rage Face</option>
          <option value='Grumpy-Toad'>Grumpy Toad</option>
          <option value='Frustrated-Boromir'>Frustrated Boromir</option>
          <option value='Futurama-Fry'>Futurama Fry</option>
          <option value='Hercules-Hades'>Hercules Hades</option>
          <option value='Happy-Guy-Rage-Face'>Happy Guy Crying Face</option>
          <option value='Hipster-Ariel'>Hipster Ariel</option>
          <option value='Ill-Have-You-Know-Spongebob'>Ill Have You Know Spongebob</option>
          <option value='Mr-Krabs-Blur-Meme'>Mr Krabs Blur Meme</option>
          <option value='1990s-First-World-Problems'>1990's First World Problems</option>
        </select>
        <h3 className='text-primary'>enter top text</h3>
        <input className="form-control form-control-lg" value={topText} onChange={(e) => { updateTopText(e.target.value); }}></input>
        <h3 className='text-primary'>enter bottom text</h3>
        <input className="form-control form-control-lg" value={bottomText} onChange={(e) => { updateBottomText(e.target.value); }}></input>
        <h3 className='text-primary'>Would you consider this meme positive, negative, or neutral?</h3>
        <select >
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>
        <h3 className='text-primary'>click 'send meme' button to start conversation</h3>
        <h5 className={'text-danger'}>{ noUserMessage }</h5>
        <button className='btn btn-primary' onClick={() => { 
          sendMessage()
          postConflict()
        }}>send meme</button>
      </div>
      {' '}
      <div style={{ width: '47%', float: 'right' }}>
        <br></br>
        <br></br>
        <div className='text-center' style={{width: '90%'}}>
          <img
            src={`https://apimeme.com/meme?meme=${meme}&top=${topText}&bottom=${bottomText}`.replaceAll(' ', '+')}
            className='img-thumbnail'
          ></img>
        </div>
      </div>
    </div>
  );
};

export default StartConversation;
