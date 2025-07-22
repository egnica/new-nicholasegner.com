import React from "react";
import { useState, useEffect, useRef } from "react";

function intro() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <>
      <h1>Welcome to my 'About Me' Page</h1>
      <p>{currentTime}</p>
      <video ref={videoRef} controls>
        <source
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/intro.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

export default intro;
