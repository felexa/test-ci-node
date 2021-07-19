import Enum from "./Enum";

const [GET, POST, PUT, DELETE, PATCH] = [
    {
        value: {
            hasBody: false
        }
    },
    {
        value: {
            hasBody: true
        }
    },
    {
        value: {
            hasBody: true
        }
    },
    {
        value: {
            hasBody: false
        }
    },
    {
        value: {
            hasBody: true
        }
    }
];

const HttpMethods = new Enum({
    GET,
    POST,
    PUT,
    DELETE,
    PATCH
});

export default HttpMethods;
