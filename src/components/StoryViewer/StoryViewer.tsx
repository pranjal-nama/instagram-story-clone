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

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentIndex,
  closeViewer,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(currentIndex);
  const [startY, setStartY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next');
  const [hasTransitioned, setHasTransitioned] = useState(false); // NEW

  const currentStory = stories[currentStoryIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEndY = e.touches[0].clientY;
    if (startY - touchEndY > 50) {
      // swipe up
    } else if (touchEndY - startY > 50) {
      closeViewer();
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const goToNextStory = () => {
    setTransitionDirection('next');
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    setLoading(true);
    setHasTransitioned(true);
  };

  const goToPreviousStory = () => {
    setTransitionDirection('prev');
    setCurrentStoryIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
    );
    setLoading(true);
    setHasTransitioned(true);
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
        <div className="story-left" onClick={goToPreviousStory} />

        <div className="story-slider">
          {loading && (
            <div className="loader">
              <span>Loading...</span>
            </div>
          )}

          <div
            key={currentStory.id}
            className={`story-image-container ${
              hasTransitioned
                ? transitionDirection === 'next'
                  ? 'slide-right'
                  : 'slide-left'
                : 'no-animation'
            }`}
          >
            <img
              className="story-image"
              src={currentStory.image}
              alt={currentStory.username}
              onLoad={handleImageLoad}
            />
          </div>
        </div>

        <div className="story-right" onClick={goToNextStory} />
      </div>
    </div>
  );
};

export default StoryViewer;
