// Navbar.jsx
import React, { useState } from 'react';

const Navbar = ({ bookmarks, toggleBookmarkModal, travel }) => {
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarkModalOpen(!isBookmarkModalOpen);
    toggleBookmarkModal();
  };

  const handleTravelClick = () => {
    setIsTravelModalOpen(!isTravelModalOpen);
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
        <div className="fixed inset-0 z-50 overflow-auto bg-opacity-75 bg-gray-900 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Merkliste</h2>
            <ul>
              {bookmarks.map((bookmark, index) => (
                <li key={index} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {bookmark.photos && bookmark.photos.length > 0 ? (
                      <img
                        src={bookmark.photos[0]}
                        alt={bookmark.displayName.text}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-md mr-4 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{bookmark.displayName.text}</h3>
                      <p className="text-gray-600">{bookmark.formattedAddress}</p>
                    </div>
                  </div>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => toggleBookmarkModal(index)}
                  >
                    Entfernen
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleBookmarkClick}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
      {isTravelModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-opacity-75 bg-gray-900 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Reiseverlauf</h2>
            <ul>
              {travel.map((place, index) => (
                <li key={index} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {place.photos && place.photos.length > 0 ? (
                      <img
                        src={place.photos[0]}
                        alt={place.displayName.text}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-md mr-4 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{place.displayName.text}</h3>
                      <p className="text-gray-600">{place.formattedAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-400 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {/* Add rating input here */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleTravelClick}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;