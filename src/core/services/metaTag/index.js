import HttpClient from "app/core/utilites/httpClient/HttpClient";

import Env from "app/core/environment";
import Repository from "./repository/Repository";
import MetaTag from "./MetaTag";

let metaTag = new MetaTag({
    dependencies: {
        Repository: new Repository({
            urls: {
                getMetaTags: {
                    domain: Env.getInstance().getMetaServiceHost(),
                    path: "/api/link-info",
                    query: {
                        url: ""
                    }
                }
            },
            dependencies: {
                HttpClient
            }
        })
    }
});

export default {
    getInstance() {
        return metaTag;
    }
};
