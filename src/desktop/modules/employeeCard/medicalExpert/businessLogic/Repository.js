class Repository {
    constructor(props) {
        this.urls = props.urls;

        this.HttpClient = props.dependencies.HttpClient;

        this.httpClient = new this.HttpClient();
    }
}

export default Repository;
