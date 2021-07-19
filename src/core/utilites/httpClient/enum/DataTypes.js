import Enum from "./Enum";

const [JSON, URLENCODED, TEXTHTML] = [
    {
        value: {
            headers: {
                "content-type": "application/json; charset=utf-8"
            }
        }
    },
    {
        value: {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }
    },
    {
        value: {
            headers: {
                "content-type": "text/html"
            }
        }
    }
];

const DataTypes = new Enum({
    JSON,
    URLENCODED,
    TEXTHTML
});

export default DataTypes;
