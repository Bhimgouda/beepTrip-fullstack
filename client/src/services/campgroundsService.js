import http from "./httpService";
import config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "/campgrounds";

function campgroundUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// Create request

export function addCampground(campground) {
  return http.post(apiEndpoint, campground, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// Read requests

export function getCampgrounds() {
  return http.get(apiEndpoint);
}

export function showCampground(id) {
  return http.get(campgroundUrl(id));
}

// Update Requests

export function updateCampground(id, campground) {
  return http.put(`${campgroundUrl(id)}`, campground, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// Delete Requests

export function deleteCampground(id) {
  return http.delete(campgroundUrl(id));
}
