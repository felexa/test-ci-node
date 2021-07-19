import Env from "app/core/environment";

import HttpClient from "app/core/utilites/httpClient/HttpClient";

import Repository from "./repository/Repository";
import Media from "./Media";

let media = new Media({
    dependencies: {
        Repository: new Repository({
            urls: {
                upload: {
                    domain: Env.getInstance().getMediaServiceHost(),
                    path: "/api/images"
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
        return media;
    }
};
