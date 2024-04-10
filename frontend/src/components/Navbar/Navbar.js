// Navbar.jsx
import React, { useState } from 'react';
import BookmarkModal from './BookmarkModal';
import TravelModal from './TravelModal';

const Navbar = ({ bookmarks, toggleBookmarkModal, travel, setTravel }) => {
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [ratings, setRatings] = useState({});

  const handleBookmarkClick = () => {
    setIsBookmarkModalOpen(!isBookmarkModalOpen);
  };

  const handleTravelClick = () => {
    setIsTravelModalOpen(!isTravelModalOpen);
  };

  const handleCompleteBookmark = (bookmark) => {
    setTravel([...travel, bookmark]);
    toggleBookmarkModal(bookmarks.findIndex((b) => b.displayName.text === bookmark.displayName.text));
  };

  const handleRatingChange = (placeId, rating) => {
    setRatings({ ...ratings, [placeId]: rating });
  };

  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="text-white text-3xl font-bold">CITYPEDIA</div>
          </div>
          <div className="flex items-center">
            <button
              className="text-white hover:bg-blue-700 font-bold py-2 px-4 rounded mr-4"
              onClick={handleBookmarkClick}
            >
              Merkliste ({bookmarks.length})
            </button>
            <button
              className="text-white hover:bg-blue-700 font-bold py-2 px-4 rounded"
              onClick={handleTravelClick}
            >
              Reiseverlauf ({travel.length})
            </button>
          </div>
        </div>
      </div>
      {isBookmarkModalOpen && (
        <BookmarkModal
          bookmarks={bookmarks}
          toggleBookmarkModal={handleBookmarkClick}
          handleCompleteBookmark={handleCompleteBookmark}
        />
      )}
      {isTravelModalOpen && (
        <TravelModal
          travel={travel}
          ratings={ratings}
          handleRatingChange={handleRatingChange}
          handleTravelClick={handleTravelClick}
        />
      )}
    </nav>
  );
};

export default Navbar;