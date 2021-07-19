import Env from "app/core/environment";

import HttpClient from "app/core/utilites/httpClient/HttpClient";

import Repository from "./repository/Repository";
import Search from "./Search";

let search = new Search({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                getItemsByQueryAutocomplete: {
                    domain: Env.getInstance().getSearchServiceHost(),
                    path: "/pub/v1/search/autocomplete"
                },
                getItemsByQuery: {
                    domain: Env.getInstance().getBitrixHost(),
                    path: "/bitrix/templates/apteka24/ajax.php"
                }
            }
        })
    }
});

export default {
    getInstance() {
        return search;
    }
};
