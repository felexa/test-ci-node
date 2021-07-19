import Env from "app/core/environment";

let env = Env.getInstance(),
    repositoryURL = env.getMainImageRepository();

export default [
    // first
    [
        {
            desktop: {
                original: `${repositoryURL}/top-banners/bepanten/bepanten-desktop3-1.jpg`
                // preview: `${repositoryURL}/top-banners/bepanten/bepanten-desktop3-preview.svg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/bepanten/bepanten-mobile3-1.jpg`
                // preview: `${repositoryURL}/top-banners/bepanten/bepanten-mobile3-preview.svg`
            },
            background: "#D4F5FF",
            url: "https://www.apteka24.ua/mnn/bepanten/?utm_source=banner&utm_medium=top&utm_campaign=bepanten",
            title: "Бепантен. Обирай турботу про себе та малюка"
        },
        {
            desktop: {
                original: `${repositoryURL}/top-banners/bepanten/bepanten-desktop3-2.jpg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/bepanten/bepanten-mobile3-2.jpg`
            },
            background: "#D4F5FF",
            url: "https://www.apteka24.ua/mnn/bepanten/?utm_source=banner&utm_medium=top&utm_campaign=bepanten",
            title: "Бепантен. Обирай турботу про себе та малюка"
        },
        {
            desktop: {
                original: `${repositoryURL}/top-banners/bepanten/bepanten-desktop3-3.jpg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/bepanten/bepanten-mobile3-3.jpg`
            },
            background: "#D4F5FF",
            url: "https://www.apteka24.ua/mnn/bepanten/?utm_source=banner&utm_medium=top&utm_campaign=bepanten",
            title: "Бепантен. Обирай турботу про себе та малюка"
        }
    ],

    // second
    [
        {
            desktop: {
                original: `${repositoryURL}/top-banners/bepantenPlus/bepantenPlus-desktop3-1.jpg`
                // preview: `${repositoryURL}/top-banners/bepantenPlus/bepantenPlus-desktop3-preview.svg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/bepantenPlus/bepantenPlus-mobile3-1.jpg`
                // preview: `${repositoryURL}/top-banners/bepantenPlus/bepantenPlus-mobile3-preview.svg`
            },
            background: "#D4F5FF",
            url: "https://www.apteka24.ua/bepanten-plyus-krem-5-30g-dekspantenol/?utm_source=banner&utm_medium=top&utm_campaign=bepanten_plus",
            title: "Бепантен плюс. Знезараження та загоєння ранок без болю"
        },
        {
            desktop: {
                original: `${repositoryURL}/top-banners/bepantenPlus/bepantenPlus-desktop3-2.jpg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/bepantenPlus/bepantenPlus-mobile3-2.jpg`
            },
            background: "#D4F5FF",
            url: "https://www.apteka24.ua/bepanten-plyus-krem-5-30g-dekspantenol/?utm_source=banner&utm_medium=top&utm_campaign=bepanten_plus",
            title: "Бепантен плюс. Знезараження та загоєння ранок без болю"
        },
        {
            desktop: {
                original: `${repositoryURL}/top-banners/bepantenPlus/bepantenPlus-desktop3-3.jpg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/bepantenPlus/bepantenPlus-mobile3-3.jpg`
            },
            background: "linear-gradient(180deg, #BBE0F2 0%, #DDF9FC 100%)",
            url: "https://www.apteka24.ua/bepanten-plyus-krem-5-30g-dekspantenol/?utm_source=banner&utm_medium=top&utm_campaign=bepanten_plus",
            title: "Бепантен плюс. Знезараження та загоєння ранок без болю"
        }
    ],

    // third
    [
        {
            desktop: {
                original: `${repositoryURL}/top-banners/epius/epius-desktop3-1.jpg`
                // preview: `${repositoryURL}/top-banners/epius/epius-desktop3-preview.svg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/epius/epius-mobile3-1.jpg`
                // preview: `${repositoryURL}/top-banners/epius/epius-mobile3-preview.svg`
            },
            background: "#0c4251",
            url: "https://www.apteka24.ua/mnn/erius/?utm_source=banner&utm_medium=top&utm_campaign=erius",
            title: "Еріус. Наука проти алергії"
        },
        {
            desktop: {
                original: `${repositoryURL}/top-banners/epius/epius-desktop3-2.jpg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/epius/epius-mobile3-2.jpg`
            },
            background: "#0c4251",
            url: "https://www.apteka24.ua/mnn/erius/?utm_source=banner&utm_medium=top&utm_campaign=erius",
            title: "Еріус. Наука проти алергії"
        },
        {
            desktop: {
                original: `${repositoryURL}/top-banners/epius/epius-desktop3-3.jpg`
            },
            mobile: {
                original: `${repositoryURL}/top-banners/epius/epius-mobile3-3.jpg`
            },
            background: "#0c4251",
            url: "https://www.apteka24.ua/mnn/erius/?utm_source=banner&utm_medium=top&utm_campaign=erius",
            title: "Еріус. Наука проти алергії"
        }
    ]
];
