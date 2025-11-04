import React, { useState } from "react";
import "./App.css"; 

function StarRating({ value, onChange }) {
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`star ${n <= value ? "filled" : ""}`}
        >
          {n <= value ? "⭐" : "☆"}
        </button>
      ))}
    </span>
  );
}

export default function App() {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);

  const addMovie = () => {
    if (!title.trim()) return;
    setMovies([...movies, { title: title.trim(), comment: comment.trim(), rating }]);
    setTitle("");
    setComment("");
    setRating(0);
  };

  const removeMovie = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  const updateRating = (index, r) => {
    setMovies(movies.map((m, i) => (i === index ? { ...m, rating: r } : m)));
  };

  return (
    <div className="app-container">
      <h1>Movies Watch List</h1>

      {/* Add Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="rating-section">
          <label>Rating:</label>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <textarea
          rows={2}
          placeholder="Comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      {/* Movie List */}
      <h2>My Movies</h2>
      {movies.length === 0 ? (
        <p className="empty-msg">No movies yet.</p>
      ) : (
        <ul className="movie-list">
          {movies.map((m, index) => (
            <li key={index} className="movie-item">
              <div className="movie-header">
                <strong>{m.title}</strong>
                <button className="remove-btn" onClick={() => removeMovie(index)}>
                  Remove
                </button>
              </div>
              <div className="movie-rating">
                <label>Rating:</label>
                <StarRating value={m.rating} onChange={(r) => updateRating(index, r)} />
              </div>
              {m.comment && <p className="movie-comment">💬 {m.comment}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


