import React, { useEffect } from "react";

const Reviews = ({ reviews, onReviewDelete, user }) => {
  useEffect(() => {}, [reviews]);
  if (!reviews) return;

  return reviews.map((review, index) => (
    <div key={index} className="card mb-3">
      <div className="card-body">
        <h6 className="card-subtitle mb-3 text-muted">
          By: {review.author.username}
        </h6>
        <p className="starability-result" data-rating={review.rating}>
          Rated: 3 stars
        </p>
        <p className="card-text">Review: {review.reviewBody}</p>
        {user._id === review.author._id && (
          <button
            onClick={() => onReviewDelete(review)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  ));
};

export default Reviews;
