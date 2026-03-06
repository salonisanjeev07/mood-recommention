import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [text, setText] = useState("AP Dhillon");
  const [video, setVideo] = useState([]);

  const getVideo = async () => {
    const res = await axios.post("https://mood-recommention.onrender.com/mood", {
      text: text
    });

    setVideo(res.data);
  };

  return (
    <div className="app">
      <h1>Mood Based Music Recommendation</h1>

      <input
        placeholder="How is your Mood Today"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={getVideo}>Predict</button>

      <div className="video">
        {video.map((v) => (
          <iframe
            width="640"
            height="360"
            key={v.id.videoId}
            src={`https://www.youtube.com/embed/${v.id.videoId}`}
            title="video"
            allowFullScreen
          />
        ))}
      </div>
    </div>
  );
}

export default App;
