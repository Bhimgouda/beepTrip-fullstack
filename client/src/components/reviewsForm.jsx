import React from "react";

const ReviewsForm = ({ handleReviewSubmit }) => {
  return (
    <React.Fragment>
      <h2 className="mt-3">Leave a Review</h2>
      <form className="mb-3" onSubmit={handleReviewSubmit}>
        <div>
          <label className="form-label" htmlFor="rating">
            Rating
          </label>
          <fieldset className="starability-grow">
            <input
              type="radio"
              id="no-rate"
              className="input-no-rate"
              name="rating"
              value="0"
              checked
              aria-label="No rating."
            />
            <input type="radio" id="first-rate1" name="rating" value="1" />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input type="radio" id="first-rate2" name="rating" value="2" />
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input type="radio" id="first-rate3" name="rating" value="3" />
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input type="radio" id="first-rate4" name="rating" value="4" />
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input type="radio" id="first-rate5" name="rating" value="5" />
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="body">
            Review
          </label>
          <textarea
            className="form-control"
            name="reviewBody"
            id="body"
            cols="30"
            rows="3"
          ></textarea>
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default ReviewsForm;
