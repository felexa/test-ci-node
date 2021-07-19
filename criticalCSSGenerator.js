const penthouse = require("penthouse");
const fs = require("fs");

penthouse({
    url: 'https://product-qa2.z.apteka24.ua/farmatsitron-23-g-n10/',
    css: "./criticalCSS/input.css",
    // width: 767,
    width: 1200,
    height: 900
})
    .then((criticalCss) => {
        // use the critical css
        fs.writeFileSync("./criticalCSS/output.css", criticalCss);
    });
