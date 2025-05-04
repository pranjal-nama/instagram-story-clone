import React, { useEffect, useState } from "react";
import Story from './Story';
import './StoryList.css';

interface StoryData {
  id: number;
  username: string;
  image: string;
}

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<StoryData[]>([]);

  useEffect(() => {
    fetch("/stories.json")
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  const yourStory = {
    id: 0,
    username: "Your Story",
    image: "https://picsum.photos/id/1005/200/300"
  };

  const allStories = [yourStory, ...stories];

  return (
    <div className="story-list-wrapper">
      <h2 className="app-name">Instagram</h2>
      <div className="story-list">
        {allStories.map(story => (
          <Story key={story.id} image={story.image} username={story.username} />
        ))}
      </div>
    </div>
  );
};

export default StoryList;
