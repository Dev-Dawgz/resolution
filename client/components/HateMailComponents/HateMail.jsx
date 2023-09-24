import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io();

const HateMail = ({ user }) => {
  const [text, setText] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");

  useEffect(() => {
    axios.get("/api/recipients").then((response) => {
      console.log(response.data);
      setRecipients(response.data);
    });

    // Listen for a "newHatemail" event from the server
    socket.on("newHatemail", (data) => {
      console.log("Received new hatemail:", data);
      // update UI or take any other action here
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection
    };
  }, []);

  const handleRecipientChange = (e) => {
    setSelectedRecipient(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/hatemail", { text, recipientId: selectedRecipient })
      .then((response) => {
        console.log("Hatemail sent successfully!");

        // Emit a "newHatemail" event to the server
        socket.emit("newHatemail", {
          recipientId: selectedRecipient,
          text,
        });

        setText("");
        setSelectedRecipient("");
      })
      .catch((error) => {
        console.error("Error sending hatemail:", error);
      });
  };

  return (
    <div>
      <h2>Send Hatemail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipient">Select a Recipient:</label>
          <select
            id="recipient"
            name="recipient"
            value={selectedRecipient}
            onChange={handleRecipientChange}
          >
            <option value="">Select a recipient</option>
            {recipients.map((recipient) => (
              <option key={recipient.id} value={recipient.id}>
                {recipient.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hatemailText">Hatemail Text:</label>
          <textarea
            id="hatemailText"
            name="hatemailText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Hatemail</button>
      </form>
    </div>
  );
};

export default HateMail;
