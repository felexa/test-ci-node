import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository();

export default {
    preview: {
        desktop: {
            alt: "banner",
            title: "",
            src: {
                original: `${repositoryURL}/manufacturer/farkos/banner-fk.jpg`,
                large: `${repositoryURL}/manufacturer/farkos/banner-fk.jpg`
            }
        }
    }
};
