import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Void from "./Void.jsx";

const Home = ({ user, changePoints }) => {

  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [toggleOff, setToggleOff] = useState(false);
  const [submit, setSubmit] = useState(true);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  // SUBMITS anonymous SCREAM INTO THE VOID
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    const fetchData = async () => {
      await axios
        .post("/void", { text })
        .then((data) => {
          console.log("Success! handleSubmit post request data ==>", data);
          // empty input field
          setText("");
          setSubmit(false);
        })
        .catch((err) => {
          console.error("Error in handleSubmit axios.post request ===>", err);
        });
    };
    // also add points to user
    changePoints(user, 3);

    // open void on submit click if toggleOff state is true
    if (toggleOff) {
      document.getElementById("void-toggle-btn").click();
    }
    // calls async function
    fetchData();
  };

  // GET ALL SCREAMS THEN SET 'setPosts' STATE IN ORDER OF MOST RECENT FROM VOID TABLE
  useEffect(() => {
    // async function to get void table data
    const fetchData = async () => {
      await axios
        .get("/void")
        .then((response) => {
          // updates 'posts' state array with void table data
          setPosts(
            // sorts posts with the most recent at the top of void feed
            response.data.sort((a, b) =>
              b.createdAt > a.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
            )
          );
        })
        .catch((err) => {
          console.error("Error in useEffect axios.get request ===>", err);
        });
    };
    // calls async function
    fetchData();
    // runs useEffect every time handleSubmit function is invoked similar to componentDidMount()
  }, [submit]);

  // ONCLICK STATE UPDATE FOR VOID TOGGLE OPEN OR CLOSE
  const handleVoidToggle = () => {
    setToggleOff(!toggleOff);
  };

  return (
    <div className="home section">
      <main className="container">
        <div className="intro">
          {user && <h3>Hi {user.username} 👋</h3>}
          <h1 className="text-primary">Welcome to Resolution</h1>
          <p>
            This innovative app will change the way you resolve interpersonal
            conflict. Resolution offers multiple features for all of your
            conflict resolution needs. This app is a medium for you to express
            your emotions, communicate with others in a low pressure
            environment, and make decisions about how to move forward. Utilizing
            all that resolution has to offer will improve your relationships
            with others and your quality of life overall.
          </p>
        </div>
        <hr></hr>
        <div className="scream-void-component">
          <div className="input-scream-container mb-3">
            <h2 className="text-primary">📣 Scream into the Void</h2>
            <p>
              Do you need to vent? Often, this might be the first constructive
              way to deal with your conflict. Put words to your emotions, say
              your piece and get everything off your chest. All screams are
              anonymous.
            </p>
            <textarea
              name="scream"
              type="text"
              placeholder="Go Ahead and Vent"
              onChange={handleChange}
              onKeyDown={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
              value={text}
              rows="3"
              className="input-group"
            ></textarea>
            <button
              className="btn btn-primary mt-2 pe-5 ps-5"
              onClick={(e) => handleSubmit(e)}
            >
              <b>SUBMIT</b>
            </button>
          </div>
          <div id="accordion">
            <div className="card">
              <div className="card-header d-flex flex-row-reverse" id="void">
                <h5 className="mb-0">
                  <button
                    id="void-toggle-btn"
                    className="btn btn-link"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseVoid"
                    aria-expanded="true"
                    aria-controls="collapseVoid"
                    onClick={handleVoidToggle}
                  >
                    {toggleOff ? (
                      <div className="toggle-icon-container">
                        <i className="bi bi-toggle-off"></i>
                        <span className="toggle-text">OPEN VOID</span>
                      </div>
                    ) : (
                      <div className="toggle-icon-container">
                        <i className="bi bi-toggle-on"></i>
                        <span className="toggle-text">CLOSE VOID</span>
                      </div>
                    )}
                  </button>
                </h5>
              </div>
            </div>
            <div
              id="collapseVoid"
              className="collapse show"
              aria-labelledby="void"
              data-parent="#accordion"
            >
              <Void
                className="card-body"
                user={user}
                changePoints={changePoints}
                posts={posts}
                submit={submit}
              />
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="messenger-intro">
          <h2 className="text-primary">
            <Link className="link" to="/Messages">
              🤣 Meme Messenger
            </Link>
          </h2>
          <p>
            Do you have something you need to say, but just can’t find the right
            way to say it? We offer a convenient and expressive meme generator
            to help communicate your feelings to others in a light-hearted way.
            It might be tough to say what needs to be said; why not break the
            ice with a meme.
          </p>
        </div>
        <hr></hr>
        <div className="decision-maker-intro">
          <h2 className="text-primary">
            <Link className="link" to="/DecisionMaker">
              🎯 Decision Maker
            </Link>
          </h2>
          <p>
            Are you ready to move forward with your conflict, but need an
            unbiased way to decide how? Our decision maker feature offers a
            fair, neutral answer. Through a game of rock, paper, scissors, you
            and your opponent will be able to come to a concrete decision.
          </p>
        </div>
        <hr></hr>
        <div className="wall-of-fame-intro">
          <h2 className="text-primary">
            <Link className="link" to="/WallOfFame">
              🏆 Wall of Fame
            </Link>
          </h2>
          <p>
            Earn points and trophies as you become a master conflict resolver!
            Our top 10 Resolution users will be featured on the Wall of Fame.
          </p>
        </div>
        <hr></hr>
        <div className="controversy-intro">
          <h2 className="text-primary">
            <Link className="link" to="/Controversy">
            😨 Controversy
            </Link>
          </h2>
          <p>
            Start some S#@!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
