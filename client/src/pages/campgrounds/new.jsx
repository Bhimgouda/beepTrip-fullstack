import { addCampground } from "../../services/campgroundsService";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validate } from "../../utils/validate";

const NewCampground = ({}) => {
  const [campground, setcampground] = useState({
    description: "",
    images: "",
    location: "",
    price: "",
    title: "",
  });
  const [error, setErrors] = useState({});

  let navigate = useNavigate();

  const handleChange = (e) => {
    const c = { ...campground };
    c[e.currentTarget.name] = e.currentTarget.value;
    setcampground(c);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formElements = [...e.target.elements]; // This was html collection so we have to convert it to an array to use array methods on it
      const newCamp = {}; // We created this object for validation purposes
      formElements.forEach((el) => {
        if (el.nodeName === "INPUT" || el.nodeName === "TEXTAREA")
          newCamp[`${el.id}`] = el.value;
      });
      const { images, description, title, price, location } = e.target;
      const formData = new FormData();
      for (var i = 0; i < images.files.length; i++) {
        formData.append("images", images.files[i]);
      }
      formData.append("description", description.value);
      formData.append("price", price.value);
      formData.append("location", location.value);
      formData.append("title", title.value);
      const { data: camp } = await addCampground(formData);
      toast.success("Campground Successfully Added", { autoClose: 2500 });
      navigate(`/campgrounds/${camp._id}`);
    } catch (e) {
      toast.error(error.response.data, { autoClose: 2500 });
    }
  };

  return (
    <div className="row">
      <h1 className="text-center">New Campground</h1>
      <div className="col-6 offset-3">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          noValidate
          action=""
        >
          <div className="mb-2">
            <label className="form-label" htmlFor="const ">
              Title
            </label>
            <input
              onChange={handleChange}
              required
              className="form-control"
              type="text"
              id="title"
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="location">
              Location
            </label>
            <input
              onChange={handleChange}
              required
              className="form-control"
              type="text"
              id="location"
            />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="images">
              Upload Images
            </label>
            <input
              multiple
              type="file"
              name="images"
              id="images"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Campground Price
            </label>
            <div className="input-group">
              <span className="input-group-text" id="price-label">
                $
              </span>
              <input
                onChange={handleChange}
                id="price"
                type="text"
                className="form-control"
                placeholder="0.00"
                aria-label="price"
                aria-describedby="price-label"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control"
              type="text"
              id="description"
            ></textarea>
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Add Campground</button>
          </div>
        </form>
        <Link to="/campgrounds">
          <button>All Campgrounds</button>
        </Link>
      </div>
    </div>
  );
};

export default NewCampground;
