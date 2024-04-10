// BookmarkModal.jsx
import React from 'react';

const BookmarkModal = ({ bookmarks, toggleBookmarkModal, handleCompleteBookmark }) => {
  return (
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
              <div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => toggleBookmarkModal(index)}
                >
                  Entfernen
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleCompleteBookmark(bookmark)}
                >
                  Abschließen
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleBookmarkModal}
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default BookmarkModal;