import _ from "lodash";

import Env from "app/core/environment";

import LocalStorageEnum from "app/core/utilites/enum/localStorageName";

import LocalStorage from "app/core/utilites/storage/localStorage";
import Observer from "app/core/utilites/observer/Observer";
import HttpClient from "app/core/utilites/httpClient/HttpClient";

import EmployeeEntity from "app/core/entities/profile/employee/Employee";
import ProfileEntity from "app/core/entities/profile/Profile";

import Repository from "./repository/Repository";
import Authorization from "./Authorization";

let authorization = new Authorization({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                getProfile: {
                    domain: Env.getInstance().getAuthorizationServiceHost(),
                    path: "/api/profile"
                },
                generateOTP: {
                    domain: Env.getInstance().getAuthorizationServiceHost(),
                    path: "/api/send/otp",
                    query: {}
                },
                verifyOTP: {
                    domain: Env.getInstance().getAuthorizationServiceHost(),
                    path: "/api/login",
                    query: {}
                }
            }
        }),
        Env: Env.getInstance(),
        LocalStorage: LocalStorage.getInstance(),
        LocalStorageEnum: LocalStorageEnum.getInstance(),
        Observer,
        ProfileEntity,
        EmployeeEntity
    }
});

export default {
    events: _.merge({}, authorization.events),
    getInstance() {
        return authorization;
    }
};
