import React from "react";
import './Story.css';

interface StoryProps {
  image: string;
  username: string;
}

const Story: React.FC<StoryProps> = ({ image, username }) => {
  return (
    <div className="story-item">
      <img
        src={image}
        alt={username}
        className="story-thumbnail"
      />
      <p className="username">{username}</p>
    </div>
  );
};

export default Story;
