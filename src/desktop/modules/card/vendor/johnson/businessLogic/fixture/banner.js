import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository();

export default {
    preview: {
        desktop: {
            title: "",
            alt: "logo",
            src: {
                original: `${repositoryURL}/manufacturer/johnson/johnson-logo.png`,
                small: `${repositoryURL}/manufacturer/johnson/johnson-logo.png`
            }
        }
    }
};
