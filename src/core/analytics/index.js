import Analytics from "app/core/analytics/Analytics";

// import Hotjar from "app/core/analytics/hotjar/Hotjar";
import FacebookPixel from "app/core/analytics/facebookPixel/FacebookPixel";
import GoogleTagManager from "app/core/analytics/googleTagManager/GoogleTagManager";
import AdmitAd from "app/core/analytics/admitAd/AdmitAd";
import Esputnik from "app/core/analytics/esputnik/Esputnik";

let analytics = new Analytics({
    dependencies: {
        // hotjar: new Hotjar({
        //     id: 1843496,
        //     snippetVersion: 6
        // }),
        facebookPixel: new FacebookPixel({
            id: "294304270978001"
        }),
        googleTagManager: new GoogleTagManager({
            id: "GTM-KK3C6FW"
        }),
        admitAd: new AdmitAd({
            eventIdentifiers: {
                home: {code: "9ce88841bf", level: 0},
                product: {code: "9ce88841bd", level: 2},
                basket: {code: "9ce88841bc", level: 3}
            }
        }),
        esputnik: new Esputnik({
            id: "93A345A7A31C46ECB21AE4C9CF1A962C"
        })
    }
});

export default {
    getInstance() {
        return analytics;
    }
};
