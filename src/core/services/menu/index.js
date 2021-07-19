import Env from "app/core/environment";
import Observer from "app/core/utilites/observer/Observer";
import Repository from "./repository/Repository";
import Menu from "./Menu";

let menu = new Menu({
    dependencies: {
        Repository: new Repository({
            urls: {
                getMenu: {
                    url: Env.getInstance().getBitrixApiHost(),
                    path: "/menu"
                }
            }
        }),
        Observer
    }
});

export default {
    getInstance() {
        return menu;
    }
};
