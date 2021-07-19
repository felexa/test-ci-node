import _ from "lodash";

import Env from "app/core/environment";

import LocalStorageEnum from "app/core/utilites/enum/localStorageName";
import LocalStorage from "app/core/utilites/storage/localStorage";
import Observer from "app/core/utilites/observer/Observer";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import AuthorizationService from "app/core/services/authorization";

import Repository from "./repository/Repository";
import Marketing from "./Marketing";

let marketing = new Marketing({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                verifyOTP: {
                    domain: Env.getInstance().getAuthorizationServiceHost(),
                    path: "/api/login",
                    query: {}
                },
                verifyEmail: {
                    domain: Env.getInstance().getAuthorizationServiceHost(),
                    path: "/api/profile/update-email",
                    query: {}
                }
            }
        }),
        LocalStorage: LocalStorage.getInstance(),
        LocalStorageEnum: LocalStorageEnum.getInstance(),
        AuthorizationService: AuthorizationService.getInstance(),
        Observer
    }
});

export default {
    events: _.merge({}, marketing.events),
    getInstance() {
        return marketing;
    }
};
