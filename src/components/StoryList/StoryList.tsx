import React,{ useEffect,useState } from "react";
import Story from '../Story/Story';
import './StoryList.css';
import StoryViewer from "../StoryViewer/StoryViewer";

interface StoryData {
  id: number;
  username: string;
  image: string;
}

const StoryList: React.FC=() => {
  const [stories,setStories]=useState<StoryData[]>([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  useEffect(() => {
    fetch("/stories.json")
      .then(res => res.json())
      .then(data => setStories(data));
  },[]);

  const yourStory={
    id: 0,
    username: "Your Story",
    image: "https://picsum.photos/id/1005/200/300"
  };

  const allStories=[yourStory,...stories];

  const openStoryViewer = (index: number) => {
    setCurrentStoryIndex(index);
    setIsViewerOpen(true);
  };

  const closeStoryViewer = () => {
    setIsViewerOpen(false);
  };


  return (
    <div className="story-list-wrapper">
      <h2 className="app-name">Instagram</h2>
      <div className="story-list">
        {allStories.map((story, index) => (
          <div key={story.id} onClick={() => openStoryViewer(index)}>
            <Story key={story.id} image={story.image} username={story.username} />
          </div>
        ))}
      </div>
      {isViewerOpen && (
        <StoryViewer
          stories={allStories}
          currentIndex={currentStoryIndex}
          closeViewer={closeStoryViewer}
        />
      )}  
    </div>
  );
};

export default StoryList;
