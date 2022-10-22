import React from "react";
import { getCampgrounds } from "../../services/campgroundsService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCampgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  useEffect(() => {
    async function get() {
      const { data: campgroundsData } = await getCampgrounds();
      setCampgrounds(campgroundsData.campgrounds);
    }
    get();
  }, []);

  return (
    <div>
      <Link to="/campgrounds/new">
        <button className="btn-dark btn mb-3 k">Add New Campground</button>
      </Link>
      <ul>
        {campgrounds.map((camp, index) => (
          <div key={index} className="card mb-3">
            <div className="row">
              <div className="col-md-4">
                <img
                  className="img-fluid"
                  src={
                    camp.images[0] &&
                    camp.images[0].url.replace("/upload", "/upload/w_550")
                  }
                  alt=""
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{camp.title}</h5>
                  <p className="card-text">
                    <small className="text-muted">{camp.description}</small>
                  </p>
                  <Link to={camp._id} className="btn btn-primary">
                    View {camp.title}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AllCampgrounds;
