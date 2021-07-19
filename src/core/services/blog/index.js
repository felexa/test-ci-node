import Env from "app/core/environment";
import BlogEntity from "app/core/entities/blog/Blog";

import HttpClient from "app/core/utilites/httpClient/HttpClient";

import Repository from "./repository/Repository";
import Blog from "./Blog";

let blog = new Blog({
    dependencies: {
        Repository: new Repository({
            urls: {
                getCategories: {
                    domain: Env.getInstance().getBlogServiceHost(),
                    path: "/api/blog/categories",
                    query: {}
                },
                getCategory: {
                    domain: Env.getInstance().getBlogServiceHost(),
                    path: "/api/blog/categories/:alias",
                    params: {
                        alias: ""
                    }
                },
                getArticles: { //todo use rubric service
                    domain: Env.getInstance().getBlogServiceHost(),
                    path: "/api/blog/articles",
                    query: {
                        "order[createdAt]": "desc",
                        page: 1,
                        itemsPerPage: 30
                    }
                },
                getArticle: {
                    domain: Env.getInstance().getBlogServiceHost(),
                    path: "/api/blog/articles/:alias",
                    params: {
                        alias: ""
                    }
                }
            },
            dependencies: {
                HttpClient
            }
        }),
        BlogEntity
    }
});

export default {
    getInstance() {
        return blog;
    }
};
