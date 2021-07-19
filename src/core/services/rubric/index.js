import Env from "app/core/environment";
import Resource from "app/core/resource";
import IconNameEnum from "app/core/utilites/enum/iconName";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import ViewedProductService from "app/core/services/viewedProducts/index";

import Repository from "./repository/Repository";
import Rubric from "./Rubric";

let rubric = new Rubric({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                Env: Env.getInstance(),
                HttpClient,
                Resource,
                ViewedProductsService: ViewedProductService.getInstance(),
                IconNameEnum: IconNameEnum.getInstance()
            },
            urls: {
                getArticles: {
                    domain: Env.getInstance().getBlogServiceHost(),
                    path: "/api/blog/articles",
                    query: {
                        "order[createdAt]": "desc",
                        page: 1,
                        itemsPerPage: 30
                    }
                },
                getArticlesByIngredientName: {
                    domain: Env.getInstance().getBlogServiceHost(),
                    path: "/api/blog/articles",
                    query: {
                        "order[createdAt]": "desc",
                        page: 1,
                        itemsPerPage: 30
                    }
                },
                getRelatedProducts: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/alias/:id/related",
                    query: {}
                },
                getPopularProducts: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/popular",
                    query: {}
                },
                getPopularProductsJohnson: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/jnj-popular",
                    query: {}
                },
                getAllProductsJohnson: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/jnj",
                    query: {
                        // page: "1",
                        // itemsPerPage: "100"
                    }
                },
                getShareProducts: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/jnj-free-delivery",
                    query: {
                        // page: "1",
                        // itemsPerPage: "100"
                    }
                },
                getPromoProducts: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/autumn-first-aid-kit",
                    query: {
                        page: "1",
                        itemsPerPage: "100"
                    }
                },
                getViewedProducts: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections",
                    query: {
                        itemsPerPage: 12
                    }
                },
                getLatestReview: {
                    domain: Env.getInstance().getReviewServiceHost(),
                    path: "/api/reviews/latest",
                    query: {}
                },
                getPopularDrugs: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/popular-drugs",
                    query: {}
                },
                getVitaminsAndMinerals: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/vitamins-and-minerals",
                    query: {}
                },
                getAntibiotics: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/antibiotics",
                    query: {}
                },
                getGynecologicalDrugs: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/gynecological-drugs",
                    query: {}
                },
                getUrologicalDrugs: {
                    domain: Env.getInstance().getCatalogServiceHost(),
                    path: "/api/projections/promoted/urological-drugs",
                    query: {}
                }
            }
        })
    }
});

export default {
    getInstance() {
        return rubric;
    }
};
