import LocalStorage from "app/core/utilites/storage/localStorage";
import LocalStorageEnum from "app/core/utilites/enum/localStorageName";
import ViewedProducts from "app/core/services/viewedProducts/ViewedProducts";

let viewedProducts = new ViewedProducts({
    dependencies: {
        LocalStorage: LocalStorage.getInstance(),
        LocalStorageEnum: LocalStorageEnum.getInstance()
    }
});

export default {
    getInstance() {
        return viewedProducts;
    }
};
