class BlobFileReader {
    constructor() {
        /**
         * @property isSupported
         * @type {boolean}
         */
        this.isSupported = false;

        BlobFileReader.testingFileReaderCreation();
    }

    /**
     * @method testingFileReaderCreation
     * @returns {void}
     */
    static testingFileReaderCreation() {
        let fileReader;

        try {
            fileReader = new FileReader();
        } catch (e) {
            fileReader = false;
        }

        this.isSupported = Boolean(fileReader);
    }

    /**
     * @method createFileReader
     * @returns {FileReader}
     */
    static createFileReader() {
        let reader;

        if (this.isSupported) {
            reader = new FileReader();
        }

        return reader;
    }

    /**
     * @method readAsData
     * @param file {Blob}
     * @param callback {Function}
     * @returns {BlobFileReader}
     */
    readAsData(file, callback) {
        let reader = BlobFileReader.createFileReader();

        if (reader) {
            if (file) {
                reader.readAsDataURL(file);
            }

            reader.onload = function () {
                callback(reader.result);
            };

            reader.onerror = function () {
                callback(reader.result);
            };
        }

        return this;
    }

    /**
     * @method readAsBinary
     * @param file {Blob}
     * @param callback {Function}
     * @returns {BlobFileReader}
     */
    readAsBinary(file, callback) {
        let reader = BlobFileReader.createFileReader();

        if (reader) {
            reader.readAsBinaryString(file);

            reader.onload = function () {
                callback(reader.result);
            };
        }

        return this;
    }
}

export default BlobFileReader;
