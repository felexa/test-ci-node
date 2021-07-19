import EnumSymbol from "./EnumSymbol";

class Enum {
    constructor(enumLiterals) {
        Object.keys(enumLiterals).forEach((key) => {
            if (!enumLiterals[key]) {
                throw new TypeError("each enum should have been initialized with atleast empty {} value");
            }

            this[key] = new EnumSymbol(key, enumLiterals[key]);
        });

        Object.freeze(this);
    }

    symbols() {
        return Object.keys(this).map((key) => this[key]);
    }

    keys() {
        return Object.keys(this);
    }

    contains(sym) {
        if (!(sym instanceof EnumSymbol)) {
            return false;
        }

        return this[Symbol.keyFor(sym.sym)] === sym;
    }
}

export default Enum;
