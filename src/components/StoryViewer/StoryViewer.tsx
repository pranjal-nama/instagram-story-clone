import React, { useState, useEffect } from 'react';
import './StoryViewer.css';

interface Story {
  id: number;
  username: string;
  image: string;
}

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  closeViewer: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, currentIndex, closeViewer }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(currentIndex);
  const [startY, setStartY] = useState(0);

  const currentStory = stories[currentStoryIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEndY = e.touches[0].clientY;
    if (startY - touchEndY > 50) {
        // swipe up, do nothing
    } else if (touchEndY - startY > 50) {
      closeViewer();
    }
  };

  const goToNextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const goToPreviousStory = () => {
    setCurrentStoryIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNextStory();
    }, 5000); 

    return () => clearTimeout(timer);
  }, [currentStoryIndex]);

  return (
    <div
      className="story-viewer-overlay"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="story-viewer-container">
        <div
          className="story-left"
          onClick={goToPreviousStory}
        />
        <div className="story-image">
          <img src={currentStory.image} alt={currentStory.username} />
        </div>
        <div
          className="story-right"
          onClick={goToNextStory}
        />
      </div>
    </div>
  );
};

export default StoryViewer;
