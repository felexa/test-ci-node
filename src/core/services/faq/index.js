import Env from "app/core/environment";
import FaqEntity from "app/core/entities/faq/FAQ";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import Repository from "./repository/Repository";
import Faq from "./Faq";

let faq = new Faq({
    dependencies: {
        Repository: new Repository({
            urls: {
                getFaq: {
                    domain: Env.getInstance().getBitrixHost(),
                    path: "/api/faq/questions/",
                    params: {},
                    query: {
                        itemsPerPage: 100,
                        page: 1,
                        mnn: ""
                    }
                },
                getFaqByCategory: {
                    domain: Env.getInstance().getBitrixHost(),
                    path: "/api/faq/questions/",
                    params: {},
                    query: {
                        category: ""
                    }
                }
            },
            dependencies: {
                HttpClient
            }
        }),
        FaqEntity
    }
});

export default {
    getInstance() {
        return faq;
    }
};
