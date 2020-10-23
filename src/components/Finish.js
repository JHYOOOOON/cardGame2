import React from "react";
import "./Finish.scss";
import { Link } from "react-router-dom";

const caculateTime = (time) => {
  let timeArray = [];
  for (let i = 0; i < 3; i++) {
    timeArray.push(Math.floor(time % 60));
    time /= 60;
  }

  let formattedTime = "";
  formattedTime += timeArray[2] < 10 ? `0${timeArray[2]}` : timeArray[2];
  formattedTime += ":";
  formattedTime += timeArray[1] < 10 ? `0${timeArray[1]}` : timeArray[1];
  formattedTime += ":";
  formattedTime += timeArray[0] < 10 ? `0${timeArray[0]}` : timeArray[0];
  return formattedTime;
};

const Finish = (props) => {
  const {
    match: {
      params: { time: time },
    },
  } = props;
  let formattedTime = caculateTime(Number(time));
  return (
    <div className="finish-container">
      <p className="congrats">Congratulations!</p>
      <p className="time">{formattedTime}</p>
      <div className="save-container">
        <input type="text" placeholder="Write your name" />
        <button>Save</button>
      </div>
      <button className="retryBtn">
        <Link to="/game">Retry</Link>
      </button>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

export default Finish;