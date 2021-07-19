// import Env from "app/core/environment";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import BannerEntity from "app/core/entities/banner/Banner";

import Repository from "./repository/Repository";
import PromoBanner from "./PromoBanner";

let promoBanner = new PromoBanner({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {}
        }),
        BannerEntity
        // Env: Env.getInstance()
    }
});

export default {
    getInstance() {
        return promoBanner;
    }
};
