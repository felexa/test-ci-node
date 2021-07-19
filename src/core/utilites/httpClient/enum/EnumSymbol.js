class EnumSymbol {
    constructor(name, {value, description}) {
        this.sym = Symbol.for(name);

        if (!Object.is(value, undefined)) {
            this.value = value;
        }

        if (description) {
            this.description = description;
        }

        Object.freeze(this);
    }

    get display() {
        return this.description || Symbol.keyFor(this.sym);
    }

    toString() {
        return this.sym;
    }

    valueOf() {
        return this.value;
    }
}

export default EnumSymbol;
