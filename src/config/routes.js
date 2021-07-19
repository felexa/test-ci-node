const routes = require("next-routes");

// .add("page", "/:subpath(uk|)?/(.*)?", "PageController");
// .add("page", "/:subpath(uk|)?/:productSlug/(.*)?", "PageController");
// .add("product", "/:subpath(uk|)?/:productSlug/:tabSlug?", "product")
// .add("index", "/:subpath(uk|)?", "index")
// .add("checkout", "/:subpath(uk|)?/checkout", "checkout")
// .add("checkout.thanks", "/:subpath(uk|)?/checkout/thanks", "checkout/thanks")
module.exports = routes()
    .add("home", "/:subpath(uk|)?", "Home")
    .add(
        "activeIngredients",
        "/:subpath(uk|)?/ingredients/:query?/:classifierName?/:pageNumber(page-\\d+)?",
        "Ingredients"
    )
    .add("pregnancy", "/:subpath(uk|)?/pregnancy", "Pregnancy")
    .add(
        "pregnancyMNN",
        "/:subpath(uk|)?/pregnancy/:ingredientName",
        "MNN"
    )
    .add(
        "MNN",
        "/:subpath(uk|)?/mnn/:ingredientName/:tabName?",
        "MNN"
    )
    .add("medikamenty", "/:subpath(uk|)?/medikamenty", "Category")
    .add(
        "catalogForMedikamenty",
        "/:subpath(uk|)?/medikamenty/(.*)",
        "Catalog"
    )
    .add(
        "catalogForBad",
        "/:subpath(uk|)?/bad/(.*)?",
        "Catalog"
    )
    .add(
        "catalogForMedTehnika",
        "/:subpath(uk|)?/medicinskaja-tehnika/(.*)?",
        "Catalog"
    )
    .add(
        "catalogForAntibiotiki",
        "/:subpath(uk|)?/antibiotiki/(.*)?",
        "Catalog"
    )
    .add(
        "catalogForKosmetologiya",
        "/:subpath(uk|)?/kosmetologiya/(.*)?",
        "Catalog"
    )
    .add(
        "catalogForMam",
        "/:subpath(uk|)?/mama-i-malysh/(.*)?",
        "Catalog"
    )
    .add(
        "catalogForOptika",
        "/:subpath(uk|)?/optika/(.*)?",
        "Catalog"
    )
    .add(
        "catalogForKosmetika",
        "/:subpath(uk|)?/kosmetika-i-gigiena/(.*)?",
        "Catalog"
    )
    .add(
        "catalogForSeksualnoeZdorove",
        "/:subpath(uk|)?/seksualnoe-zdorove/(.*)?",
        "Catalog"
    )
    .add("employeeDiscount", "/:subpath(uk|)?/staff-loyalty", "EmployeeDiscount")
    .add("advantages", "/:subpath(uk|)?/advantages", "Advantages")
    .add("howWeWork", "/:subpath(uk|)?/how-we-work", "HowWeWork")
    .add("search", "/:subpath(uk|)?/search", "Search")
    .add("morkovki", "/:subpath(uk|)?/morkovki", "Morkovki")
    .add("insurance", "/:subpath(uk|)?/insurance", "Insurance")
    .add("bonuses-airdrop", "/:subpath(uk|)?/bonuses-airdrop", "BonusesAirdrop")
    .add("whoAllowed", "/:subpath(uk|)?/who-allowed", "WhoAllowed")
    .add("license", "/:subpath(uk|)?/legitimnost", "License")
    .add("promo", "/:subpath(uk|)?/promo/preparaty-dlya-osenney-aptechki-10/", "Promo")
    .add("blog", "/:subpath(uk|)?/blog/:pageNumber(page-\\d+)?", "Blog")
    .add("blog-category", "/:subpath(uk|)?/blog/:category/:pageNumber(page-\\d+)?", "BlogCategory")
    .add("blog-article", "/:subpath(uk|)?/blog/:category/:article", "BlogArticle")
    .add("about", "/:subpath(uk|)?/about", "About")
    .add("about-page", "/:subpath(uk|)?/about/:pageName", "About")
    .add("team", "/:subpath(uk|)?/team", "About")
    .add("medical-experts", "/:subpath(uk|)?/team/medical-experts", "About")
    .add("employee-card", "/:subpath(uk|)?/team/:fullName", "EmployeeCard")
    .add("contacts", "/:subpath(uk|)?/contacts", "About")
    .add("mass-media", "/:subpath(uk|)?/mass-media", "About")
    .add("terms", "/:subpath(uk|)?/terms", "About")
    .add("agreement", "/:subpath(uk|)?/agreement", "About")
    .add("loyaltyRules", "/:subpath(uk|)?/loyalty-rules", "About")
    .add("loyaltyBonusRules", "/:subpath(uk|)?/loyalty-bonus-rules", "About")
    .add("order-return", "/:subpath(uk|)?/order-return", "About")
    .add("social", "/:subpath(uk|)?/social", "About")
    .add("editorial-policy", "/:subpath(uk|)?/editorial-policy", "About")
    .add("account", "/:subpath(uk|)?/account/:section?", "Account")
    .add("feedback", "/:subpath(uk|)?/feedback", "Feedback")
    .add("faq", "/:subpath(uk|)?/medical-answers/:question?", "Faq")
    .add("vendorcard", "/:subpath(uk|)?/manufacturer/:vendorId", "VendorCard")
    .add("pharmacy", "/:subpath(uk|)?/pharmacy/:cityAlias?/:drugstoreName?", "DrugstorePoints")
    .add("productReview", "/:subpath(uk|)?/(.*)/review", "ProductCardReview")
    .add("productAnalogs", "/:subpath(uk|)?/(.*)/analogs", "ProductCardAnalogs")
    .add("product", "/:subpath(uk|)?/(.*)", "ProductCard");
