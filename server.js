const next = require("next");
const cors = require("cors");
const express = require("express");
const createProxyMiddleware = require("http-proxy-middleware").createProxyMiddleware;
const compression = require("compression");
// const nextI18NextMiddleware = require("next-i18next/middleware").default;
// const nextI18next = require("./src/config/i18n");
const routes = require("./src/config/routes");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();

    server.use(
        compression({
            level: 9
        })
    );

    server.use((req, res, nextStep) => {
        res.set("Cache-Control", "no-cache");

        // res.set({
        //     'Cache-Control': 'no-cache'
        // });

        nextStep();
    });

    // server.use(nextI18NextMiddleware(nextI18next));

    server.use("/", cors(), express.static("public"));

    if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_STATIC_RESOURCES_FROM_CDN_ENABLED === "true") {
        server.use(
            "/_next",
            createProxyMiddleware({
                target: process.env.NEXT_PUBLIC_STATIC_RESOURCES_HOST,
                changeOrigin: true,
                logLevel: "silent"
            })
        );
    }

    server.all("*", handle);

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
