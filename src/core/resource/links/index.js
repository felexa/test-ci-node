import Env from "app/core/environment";

let env = Env.getInstance();

export default {
    homePage: `${env.getBitrixHost()}/`,
    badm: `https://www.badm.ua/ua/`,
    upsk: `https://upsk.com.ua/`,
    partnerAccount: "https://pk.apteka24.ua/",
    team: `${env.getBitrixHost()}/team/`,
    medicalExperts: `${env.getBitrixHost()}/team/medical-experts/`,
    pregnancy: `${env.getBitrixHost()}/pregnancy/`,
    editorialPolicy: `${env.getBitrixHost()}/editorial-policy/`,
    about: `${env.getBitrixHost()}/about/`,
    marketingPolicy: `${env.getBitrixHost()}/about/marketing-policy/`,
    howTo: `${env.getBitrixHost()}/about/howto/`,
    delivery: `${env.getBitrixHost()}/about/delivery/`,
    partners: `${env.getBitrixHost()}/about/partners/`,
    contacts: `${env.getBitrixHost()}/about/contacts/`,
    reviews: `${env.getBitrixHost()}/about/reviews/`,
    vacancies: `${env.getBitrixHost()}/about/rabota-v-apteke/`,
    mission: `${env.getBitrixHost()}/about/missiya-kompanii/`,
    warranty: `${env.getBitrixHost()}/about/warranty/`,
    loyaltyRules: `${env.getBitrixHost()}/loyalty-rules/`,
    loyaltyBonusRules: `${env.getBitrixHost()}/loyalty-bonus-rules/`,
    privacyPolicy: `${env.getBitrixHost()}/terms/`,
    userAgreement: `${env.getBitrixHost()}/agreement/`,
    reviewsPostingPolicy: `${env.getBitrixHost()}/about/politika-publikatsii-otzivov/`,
    responsibility: `${env.getBitrixHost()}/editorial-policy/#responsibility`,
    avatarLogo: `${env.getMainImageRepository()}/icons/logo-icon.svg`,
    logo: `${env.getMainImageRepository()}/icons/logotype_apteka24.svg`,
    logoSimple: `${env.getMainImageRepository()}/icons/logo-simple.svg`,
    whiteLogo: `${env.getMainImageRepository()}/icons/logotype_apteka24_white.svg`,
    howWorksBanner: `${env.getMainImageRepository()}/landings/how-it-works/banner-bg.svg`,
    howWorksFind: `${env.getMainImageRepository()}/landings/how-it-works/find.svg`,
    morkovki: `${env.getBitrixHost()}/morkovki/`,
    medicalAnswers: `${env.getBitrixHost()}/medical-answers/`,
    medikamenty: `${env.getBitrixHost()}/medikamenty/`,
    blog: `${env.getBitrixHost()}/blog/`,
    pharmacy: `${env.getBitrixHost()}/pharmacy/`,
    legitimnost: `${env.getBitrixHost()}/legitimnost/`,
    brands: `${env.getBitrixHost()}/searching/brands/`,
    massMedia: `${env.getBitrixHost()}/mass-media/`,
    social: `${env.getBitrixHost()}/social/`,
    advantages: `${env.getBitrixHost()}/advantages/`,
    howWeWork: `${env.getBitrixHost()}/how-we-work/`,
    orderReturn: `${env.getBitrixHost()}/order-return/`,
    promo: `${env.getBitrixHost()}/promo/`,
    freeDelivery: `${env.getBitrixHost()}/promo/besplatnaya-dostavka-johnson-johnson/`,
    ingredients: `${env.getBitrixHost()}/ingredients/`,
    insurance: `${env.getBitrixHost()}/insurance/`,
    whoAllowed: `${env.getBitrixHost()}/who-allowed/`,
    account: `${env.getBitrixHost()}/account/personal-data/`,
    bonusesAirdropConditions: `${env.getMainImageRepository()}/landings/bonuses-airdrop/bonuses-airdrop-conditions.pdf`,
    icons: {
        verified: `${env.getMainImageRepository()}/icons/icon-ok.svg`,
        whiteCarrot: `${env.getMainImageRepository()}/landings/morkovki/white-carrot.svg`,
        yellowCarrot: `${env.getMainImageRepository()}/landings/morkovki/yellow-carrot.svg`,
        smile: `${env.getMainImageRepository()}/landings/advantages/smile.png`,
        refresh: `${env.getMainImageRepository()}/catalog/refresh.svg`,
        defaultAvatarUrl: `${env.getMainImageRepository()}/user-profile/Group+1814.png`,
        review: `${env.getMainImageRepository()}/user-profile/review.svg`,
        heart: `${env.getMainImageRepository()}/user-profile/heart.svg`,
        user: `${env.getMainImageRepository()}/user-profile/account.svg`,
        carrot: `${env.getMainImageRepository()}/user-profile/bonusNew.svg`,
        carrotColored: `${env.getMainImageRepository()}/landings/loyalty-program/icon-carrot.svg`,
        warning: `${env.getMainImageRepository()}/icons/warningSign.svg`,
        allowed: `${env.getMainImageRepository()}/icons/allowed.svg`,
        disallowed: `${env.getMainImageRepository()}/icons/disallowed.svg`,
        carefully: `${env.getMainImageRepository()}/icons/carefully.svg`,
        noData: `${env.getMainImageRepository()}/icons/no-data.svg`,
        instruction: `${env.getMainImageRepository()}/landings/loyalty-program/icon-instruction.svg`,
        code: `${env.getMainImageRepository()}/landings/loyalty-program/icon-code.svg`,
        pin: {
            partner: `${env.getMainImageRepository()}/icons/pinPartner.svg`,
            apteka24: `${env.getMainImageRepository()}/icons/pinApteka24.svg`
        },
        mapMarker: `${env.getMainImageRepository()}/icons/marker.svg`,
        bonuses: `${env.getMainImageRepository()}/landings/employee-discount/bonuses.svg`,
        deliveryBox: `${env.getMainImageRepository()}/landings/employee-discount/delivery-box.svg`,
        group: `${env.getMainImageRepository()}/landings/employee-discount/group.svg`,
        hotSale: `${env.getMainImageRepository()}/landings/employee-discount/hot-sale.svg`,
        image: `${env.getMainImageRepository()}/icons/iconImage.svg`,
        anonymous: `${env.getMainImageRepository()}/icons/incognito.svg`
    },
    images: {
        verified: `${env.getMainImageRepository()}/icons/icon-ok.svg`,
        corrupted: `${env.getMainImageRepository()}/loaders/corrupted.svg`,
        fedRabbit: `${env.getMainImageRepository()}/user-profile/fedRabbit.svg`,
        hungryRabbit: `${env.getMainImageRepository()}/user-profile/hungryRabbit.svg`,
        emptyWishList: `${env.getMainImageRepository()}/user-profile/empty-wishlist.svg`,
        emptyReviews: `${env.getMainImageRepository()}/user-profile/emptyReview.svg`,
        stickers: {
            carrot: `${env.getMainImageRepository()}/landings/morkovki/yellow-carrot.svg`
        },
        insurance: {
            header: `${env.getMainImageRepository()}/landings/insurance/head-image-1.svg`,
            accompaniment: `${env.getMainImageRepository()}/landings/insurance/advantages-accompaniment.svg`,
            treatment: `${env.getMainImageRepository()}/landings/insurance/advantages-treatment.svg`,
            insurance: `${env.getMainImageRepository()}/landings/insurance/advantages-insurance.svg`,
            shield: `${env.getMainImageRepository()}/landings/insurance/shield.svg`
        },
        bonusesAirdrop: {
            banner: `${env.getMainImageRepository()}/landings/bonuses-airdrop/banner1.svg`,
            couponBox: `${env.getMainImageRepository()}/landings/bonuses-airdrop/coupon-box.svg`,
            cart: `${env.getMainImageRepository()}/landings/bonuses-airdrop/cart-sale.svg`,
            couponNominal: `${env.getMainImageRepository()}/landings/bonuses-airdrop/coupon-nominal.svg`,
            coupon: `${env.getMainImageRepository()}/landings/bonuses-airdrop/coupon.svg`
        },
        whoAllowed: {
            cautionChildren: `${env.getMainImageRepository()}/attributes/children-with-caution.svg`,
            desktop: {
                ru: {
                    whoCan: `${env.getMainImageRepository()}/landings/who-allowed/def_desktop_ru.png`,
                    carefully: `${env.getMainImageRepository()}/landings/who-allowed/checked_desktop_ru.png`,
                    children: `${env.getMainImageRepository()}/landings/who-allowed/2desktop_ru.png`
                },
                ua: {
                    whoCan: `${env.getMainImageRepository()}/landings/who-allowed/def_desktop_uk.png`,
                    carefully: `${env.getMainImageRepository()}/landings/who-allowed/checked_desktop_uk.png`,
                    children: `${env.getMainImageRepository()}/landings/who-allowed/2desktop_uk.png`
                }
            },
            mobile: {
                ru: {
                    whoCan: `${env.getMainImageRepository()}/landings/who-allowed/1mob_ru1.png`,
                    carefully: `${env.getMainImageRepository()}/landings/who-allowed/2mob_ru.png`,
                    children: `${env.getMainImageRepository()}/landings/who-allowed/3mob_ru.png`
                },
                ua: {
                    whoCan: `${env.getMainImageRepository()}/landings/who-allowed/1mob_uk.png`,
                    carefully: `${env.getMainImageRepository()}/landings/who-allowed/2mob_uk.png`,
                    children: `${env.getMainImageRepository()}/landings/who-allowed/3mob_uk.png`
                }
            }
        },
        emojis: {
            nerd: `${env.getMainImageRepository()}/loaders/emoji.png`,
            smile: `${env.getMainImageRepository()}/welcome-bonus/smile.png`,
            smileWithHearts: `${env.getMainImageRepository()}/welcome-bonus/smileWithHearts.png`,
            smilingImp: `${env.getMainImageRepository()}/welcome-bonus/smilingImp.png`
        },
        advantages: {
            header: `${env.getMainImageRepository()}/landings/advantages/header.svg`,
            headerUa: `${env.getMainImageRepository()}/landings/advantages/headerUa.svg`,
            prices: `${env.getMainImageRepository()}/landings/advantages/prices.svg`,
            discount: `${env.getMainImageRepository()}/landings/advantages/discount.svg`,
            assortment: `${env.getMainImageRepository()}/landings/advantages/assortment.svg`,
            nearHome: `${env.getMainImageRepository()}/landings/advantages/near-home.svg`,
            delivery: `${env.getMainImageRepository()}/landings/advantages/delivery.svg`,
            compare: `${env.getMainImageRepository()}/landings/advantages/compare.svg`,
            confidentially: `${env.getMainImageRepository()}/landings/advantages/confidentially.svg`,
            quality: `${env.getMainImageRepository()}/landings/advantages/quality.svg`,
            scrollBtn: `${env.getMainImageRepository()}/landings/advantages/scroll-btn.svg`
        },
        loyaltyProgram: {
            banner: `${env.getMainImageRepository()}/landings/loyalty-program/banner-img.png`,
            cashback: `${env.getMainImageRepository()}/landings/loyalty-program/icon-cashback-1.svg`,
            bannerMobile: `${env.getMainImageRepository()}/landings/loyalty-program/banner-img_mobile.png`,
            review: {
                desktop: {
                    ru: `${env.getMainImageRepository()}/landings/loyalty-program/review-preview.jpg`,
                    ua: `${env.getMainImageRepository()}/landings/loyalty-program/review-preview-uk.jpg`
                },
                mobile: {
                    ru: `${env.getMainImageRepository()}/landings/loyalty-program/mob.png`,
                    ua: `${env.getMainImageRepository()}/landings/loyalty-program/mob_uk.png`
                }
            },
            bonusPreview: {
                ru: `${env.getMainImageRepository()}/landings/loyalty-program/bonus-preview.png`,
                ua: `${env.getMainImageRepository()}/landings/loyalty-program/bonus-preview-uk.png`
            }
        },
        logo: {
            itc: `${env.getMainImageRepository()}/massmedia/itc.png`,
            facts: `${env.getMainImageRepository()}/massmedia/facts.webp`,
            rayspace: `${env.getMainImageRepository()}/massmedia/rayspace.svg`,
            retailers: `${env.getMainImageRepository()}/massmedia/retailers.svg`
        },
        footer: {
            selfMedicationMobile: `${env.getMainImageRepository()}/footer/self-medication-mobile.svg`,
            selfMedicationDesktop: `${env.getMainImageRepository()}/footer/self-medication-desktop.svg`,
            consultMobile: `${env.getMainImageRepository()}/footer/consult-mobile.svg`,
            consultDesktop: `${env.getMainImageRepository()}/footer/consult-desktop.svg`
        },
        yellowCarrot: `${env.getMainImageRepository()}/stickers/morkovki-small.svg?new`,
        yellowCarrotLarge: `${env.getMainImageRepository()}/stickers/morkovki.svg?new`,
        yellowCarrotMini: `${env.getMainImageRepository()}/user-profile/Cashback.svg`,
        installApp: {
            storePreview: `${env.getMainImageRepository()}/app-banner/app-preview-2.png`,
            appStore: {
                ru: `${env.getMainImageRepository()}/app-banner/app-store-1_ru.svg`,
                ua: `${env.getMainImageRepository()}/app-banner/app-store-1_uk.svg`
            },
            googlePlay: {
                ru: `${env.getMainImageRepository()}/app-banner/google-play_ru.svg`,
                ua: `${env.getMainImageRepository()}/app-banner/google-play_uk.svg`
            }
        },
        employeeDiscount: {
            advantages: `${env.getMainImageRepository()}/landings/employee-discount/advantages2.png`,
            box: `${env.getMainImageRepository()}/landings/employee-discount/box2.png`,
            congratulations: `${env.getMainImageRepository()}/landings/employee-discount/congratulations2.png`,
            present: `${env.getMainImageRepository()}/landings/employee-discount/present2.png`,
            acino: `${env.getMainImageRepository()}/landings/employee-discount/acino.jpg`,
            coloplast: `${env.getMainImageRepository()}/landings/employee-discount/coloplast.jpg`,
            darnitsa: `${env.getMainImageRepository()}/landings/employee-discount/darnitsa.jpg`,
            farmak: `${env.getMainImageRepository()}/landings/employee-discount/farmak.jpg`,
            fitofarm: `${env.getMainImageRepository()}/landings/employee-discount/fitofarm.jpg`,
            jj: `${env.getMainImageRepository()}/landings/employee-discount/jj.jpg`,
            nobel: `${env.getMainImageRepository()}/landings/employee-discount/nobel.jpg`,
            perrigo: `${env.getMainImageRepository()}/landings/employee-discount/perrigo.jpg`,
            reckitt: `${env.getMainImageRepository()}/landings/employee-discount/reckitt.jpg`,
            reddys: `${env.getMainImageRepository()}/landings/employee-discount/reddys.jpg`,
            shvets: `${env.getMainImageRepository()}/landings/employee-discount/shvets.jpg`,
            stada: `${env.getMainImageRepository()}/landings/employee-discount/stada.jpg`
        },
        welcomeBonus: {
            login: `${env.getMainImageRepository()}/welcome-bonus/display-phone2.svg`,
            otp: `${env.getMainImageRepository()}/welcome-bonus/display-otp.svg`,
            email: `${env.getMainImageRepository()}/welcome-bonus/display-email2.svg`,
            bonus: `${env.getMainImageRepository()}/welcome-bonus/display-bonus2.svg`,
            sorryBonus: `${env.getMainImageRepository()}/welcome-bonus/display-sorry-bonus.svg`
        },
        telegram: {
            letter: `${env.getMainImageRepository()}/telegram/letter.png`,
            preview: `${env.getMainImageRepository()}/telegram/telegram1.svg`,
            previewRounded: `${env.getMainImageRepository()}/telegram/telegram-rounded-1.svg`
        },
        viber: {
            previewRounded: `${env.getMainImageRepository()}/viber/viber-rounded-1.svg`
        },
        pharmacistPreview: `${env.getMainImageRepository()}/icons/pharmacist-preview.jpg`
    },
    emails: {
        clients: "client@apteka24.ua",
        partners: "partners@apteka24.ua",
        marketing: "marketing@apteka24.ua",
        supplier: "supplier@apteka24.ua",
        wholesale: "wholesale@apteka24.ua",
        rent: "rent@apteka24.ua",
        plug: "yushulga@apteka24.ua"
    },
    formBannerPrevenar: `https://forms.gle/JKcaWwC7bUiBsyZD8`,
    tradeLicense: `http://pub-mex.dls.gov.ua/TradeLicense/TradeLicenseList.aspx`,
    licenseDownload: `${env.getMainImageRepository()}/certificates/license.pdf`,
    licensePreview: `${env.getBitrixHost()}/upload/iblock/ec0/ec0a0df5c6d6a1082df8cf40fcc2e534.JPG`,
    facebookA24: `https://www.facebook.com/apteka24.ua/`,
    instagramA24: `https://www.instagram.com/apteka24.ua/`,
    telegramA24: `https://t.me/apteka24ua/`,
    lowOfUkraineAboutDrugs: `https://zakon.rada.gov.ua/laws/show/123/96-%D0%B2%D1%80#Text`,
    lowOfUkraineAboutHealthProtection: `https://zakon.rada.gov.ua/laws/show/2801-12#Text`,
    lowOfUkraineAboutCopyright: `http://pravoved.in.ua/section-law/158-zuoapisp.html`,
    stateRegisterOfDrugs: `http://www.drlz.com.ua/`,
    stateServiceOfDrugsControl: `https://www.dls.gov.ua/`,
    consumerProtection: `https://zakon.rada.gov.ua/laws/show/172-94-%D0%BF#Text`,
    worldHealthOrganization: `https://www.who.int/ru`,
    worldHealthOrganizationFaq: `https://www.who.int/ru/about/who-we-are/frequently-asked-questions`,
    ukraineMinistryHealth: `https://moz.gov.ua/`,
    whocc: "https://www.whocc.no/",
    a24AppStore: "https://apps.apple.com/ua/app/apteka24-ua/id1532392970",
    a24GooglePlay: "https://play.google.com/store/apps/details?id=ua.apteka24.app",
    viberPharmacistConsultation: "https://bit.ly/apteka24_viber",
    telegramPharmacistConsultation: "https://bit.ly/apteka24_telegram"
};
