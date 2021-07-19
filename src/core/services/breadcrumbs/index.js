import Env from "app/core/environment";
import HttpClient from "app/core/utilites/httpClient/HttpClient";
import Repository from "./repository/Repository";
import Breadcrumbs from "./Breadcrumbs";

let breadcrumbs = new Breadcrumbs({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                getBreadcrumbs: {
                    domain: Env.getInstance().getBitrixHost(),
                    path: "/ajax/breadcrumb/breadcrumb.php"
                }
            }
        })
    }
});

export default {
    getInstance() {
        return breadcrumbs;
    }
};
