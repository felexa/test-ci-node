import ReviewEntity from "app/core/entities/review/Review";
import Env from "app/core/environment";

import HttpClient from "app/core/utilites/httpClient/HttpClient";

import ThreadEntity from "app/core/entities/thread/Thread";

import Repository from "./repository/Repository";
import Review from "./Review";

let review = new Review({
    dependencies: {
        Repository: new Repository({
            urls: {
                getReview: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "/api/reviews/product/:id",
                    query: {
                        itemsPerPage: "30"
                    },
                    params: {}
                },
                getReviewById: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "/api/reviews/:id",
                    params: {},
                    query: {
                        gallery: true
                    }
                },
                getLatestReview: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "/api/reviews/latest",
                    params: {},
                    query: {}
                },
                getAnswers: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "api/records/:id/comments",
                    params: {
                        id: ""
                    },
                    query: {
                        page: 1,
                        itemsPerPage: 3
                    }
                },
                getThreadsByUserId: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "/api/authors/:id/reviews",
                    params: {
                        id: ""
                    },
                    query: {
                        page: 1
                    }
                },
                vote: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "/api/:entityType/:id/:voteType",
                    params: {}
                },
                createFeedback: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "/api/feedback"
                },
                create: {
                    // domain: "https://local.apteka24.ua:8443",
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "/api/reviews/:type",
                    params: {
                        type: "product"
                    },
                    query: {}
                },
                createAnswer: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "api/comments",
                    params: {},
                    query: {}
                }
            },
            dependencies: {
                HttpClient,
                ThreadEntity
            }
        }),
        ThreadEntity,
        ReviewEntity
    }
});

export default {
    getInstance() {
        return review;
    }
};
