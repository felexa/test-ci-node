/* eslint-disable max-len */
import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository();

export default {
    name: "Ноотрофен 250 мг N20 таблетки",
    description: "Ноотрофен – быстродействующий препарат для успокоения нервов и стимуляции умственной деятельности. Обладает  успокаивающим эффектом, снимает тревожность, придает бодрости и устраняет эмоциональные перепады настроения. Стимулирует процессы обучения и улучшает работоспособность.",
    url: "/nootrofen-tabl-250mg-20-10kh2_2613007/",
    preview: {
        title: "Ноотрофен 250 мг N20 таблетки",
        alt: "Ноотрофен 250 мг N20 таблетки",
        src: {
            original: `${repositoryURL}/manufacturer/farkos/nootrofen.png`,
            large: `${repositoryURL}/manufacturer/farkos/nootrofen.png`
        }
    }
};
