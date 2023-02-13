import React from "react";
import { getCampgrounds } from "../../services/campgroundsService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import map from "../../utils/clusterMap"
import 'mapbox-gl/dist/mapbox-gl.css';

const AllCampgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    async function get() {
      const { data: campgroundsData } = await getCampgrounds();
      setCampgrounds(campgroundsData.campgrounds);
      // Populating the Map
      map({features: campgroundsData.campgrounds});
    }
    get();
}, []);


let itemIndex = -1

  return (
    <div>
      <Link to="/campgrounds/new">
        <button className="btn btn-dark mb-3 k">Add New Campground</button>
      </Link>

      <div className="cluster-map" id="map"></div>

      <div className="card-grid">
        {campgrounds.map((camp, index) => {
        if(itemIndex !== 0 && itemIndex % 5 === 0 ) itemIndex = -1;
        itemIndex++
        return (
          <div key={index} className={`card mb-3 item-${itemIndex}`}>
            <div className="">
              <div className="">
                <img
                  className="card__image"
                  src={
                    camp.images[0] &&
                    camp.images[0].url.replace("/upload", "/upload/w_550")
                  }
                  alt=""
                />
              </div>
              <div className="">
                <div className="card-body card-body--margin">
                  <h5 className="card-title">{camp.title}</h5>
                  <p className="card-text">
                    <small className="text-muted line-clamp-2">{camp.description}</small>
                  </p>
                  <Link to={camp._id} className="btn btn-dark">
                    View {camp.title}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )

        })}
      </div>
    </div>
  );
};

export default AllCampgrounds;
