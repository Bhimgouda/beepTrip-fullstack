import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { showCampground } from "../../services/campgroundsService";
import { deleteCampground } from "../../services/campgroundsService";
import ReviewsForm from "../../components/reviewsForm";
import Reviews from "./../../components/reviews";
import { DeleteReview, postReviews } from "../../services/reviews";
import { toast } from "react-toastify";
import "../../css/stars.css";
import Carousel from "react-bootstrap/Carousel";

const ShowCampground = ({ user }) => {
  const [campground, setcampground] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Made this additional async function as we cannot assign async to useeffect method
    async function get() {
      try {
        const { data: campgroundData } = await showCampground(id);
        setcampground(campgroundData);
      } catch (e) {
        navigate("/not-found");
      }
    }
    get();
  }, []);

  const showAuthorizedBtns = () => {
    if (campground.author) {
      if (campground.author._id === user._id)
        return (
          <div className="card-body">
            <Link to={`/campgrounds/${id}/edit`}>
              <button className="card-link btn btn-info btn--edit">
                Edit Campground
              </button>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Campground
            </button>
          </div>
        );
    }
    return null;
  };

  const handleDelete = async () => {
    try {
      await deleteCampground(id);
      toast.success(`${campground.title} Campground was Deleted successfully`, {
        autoClose: 2000,
      });
      navigate("/campgrounds");
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2500 });
    }
  };

  const handleReviewSubmit = async (event) => {
    try {
      event.preventDefault();
      const { rating, reviewBody } = event.target;
      const review = { rating: rating.value, reviewBody: reviewBody.value };
      event.target.rating.value = "";
      event.target.reviewBody.value = "";
      const { data: addedReview } = await postReviews(id, review);
      const updatedCampground = { ...campground };
      updatedCampground.reviews.push(addedReview);
      toast.success("Your review was successfully added", { autoClose: 2500 });
      setcampground(updatedCampground);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2500 });
    }
  };

  const handleReviewDelete = async (review) => {
    try {
      let updatedCampground = { ...campground };
      updatedCampground.reviews = updatedCampground.reviews.filter(
        (r) => r._id !== review._id
      );
      const { data: msg } = await DeleteReview(id, review._id);
      toast.success("Your review has been deleted", { autoClose: 2500 });
      setcampground(updatedCampground);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2500 });
    }
  };

  return (
    <div className="row">
      <div className="col-6">
        <div className="card mb-3">
          <Carousel>
            {campground.images &&
              campground.images &&
              campground.images.map((image, i) => {
                return (
                  <Carousel.Item>
                    <img
                      style={{ height: 420 }}
                      className="d-block w-100"
                      src={image.url.replace("/upload", "/upload/w_550")}
                      alt=""
                    />
                  </Carousel.Item>
                );
              })}
          </Carousel>

          <div className="card-body">
            <h5 className="card-title"> {campground.title}</h5>
            <p className="card-text"> {campground.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-muted">
              {campground.location}
            </li>
            <li className="list-group-item text-muted">
              Submitted by {campground.author && campground.author["username"]}
            </li>
            <li className="list-group-item">{`${campground.price}/night`}</li>
          </ul>
          {showAuthorizedBtns()}
          <div className="card-footer text-muted">2 days ago</div>
        </div>
      </div>
      <div className="col-6">
        {user.username && (
          <ReviewsForm handleReviewSubmit={handleReviewSubmit} />
        )}
        <Reviews
          reviews={campground.reviews}
          onReviewDelete={handleReviewDelete}
          user={user}
        />
        <Link to="/campgrounds">
          <button className="btn btn-dark mt-3">All Campgrounds</button>
        </Link>
      </div>
    </div>
  );
};

export default ShowCampground;
