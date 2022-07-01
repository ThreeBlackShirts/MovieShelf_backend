import axios from "axios";

// const API_URL = "/api/auth/";
const REVIEW_API_BASE_URL = "/api/v3/review";

class ReviewService {
    searchAllReview() {
        console.log("searchAllReview service")
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/review")
    }

    writeReview( userEmail, reviewTitle, reviewContent) {
        let reviewData = {
            userEmail: userEmail,
            title: reviewTitle,
            content: reviewContent
        }
        console.log("writeReview service")
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(REVIEW_API_BASE_URL + "/", JSON.stringify(reviewData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    editReview(reviewId, reviewTitle, reviewContent) {
        let reviewData = {
            title: reviewTitle,
            content: reviewContent
        }
        console.log("editReview service")
        AuthenticationService.setupAxiosInterceptors();
        return axios.put(REVIEW_API_BASE_URL + "/" + reviewId, JSON.stringify(reviewData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    deleteReview(reviewId) {
        console.log("deleteReview service")
        AuthenticationService.setupAxiosInterceptors();
        return axios.delete(REVIEW_API_BASE_URL + "/" + reviewId);
    }

    searchReviewById(reviewId) {
        console.log("searchReview service")
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/" + reviewId);
    }

    searchReviewByUseremail(userEmail) {
        console.log("searchReviewByUseremail service")
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/" + userEmail);
    }
}

export default new ReviewService();