import http from "./httpService";
import config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "/campgrounds";

// Create Request

export const postReviews = (id, review) => {
  return http.post(`${apiEndpoint}/${id}/reviews`, review);
};

// Delete Request

export const DeleteReview = (campId, reviewId) => {
  return http.delete(`${apiEndpoint}/${campId}/reviews/${reviewId}`);
};
