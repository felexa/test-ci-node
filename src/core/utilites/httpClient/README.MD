# HttpClient

HTTP client for the browser and node.js

## Example

Initialization:

```javascript
let driver = new FetchAdapter();
let instance = new HttpClient(driver, "https://some-api.com");
```

Performing a `GET` request:

```javascript
// Make a request to https://some-api.com/users/3423/payments?page=3
instance.get(
    "users/:id/payments",
    {
        params: {
            id: 3423
        },
        query: {
            page: 3
        }
    },
    function(response) {
        // handle success
        console.log(response);
    },
    function(error) {
        // handle error
        console.log(error);
    }
);

// You can also use promises to process the query result
instance
    .get("users/:id/payments", {
        params: {
            id: 3423
        },
        query: {
            page: 3
        }
    })
    .then(function(response) {
        // handle success
        console.log(response);
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    });
```

## HttpClient API

Requests can be made by passing the relevant config to `instance.request`

**instance.request(config)**

```javascript
instance.request({
    path: "users/:id/payments",
    method: HttpClient.methods.POST,
    params: {
        id: 3423
    },
    body: {
        paymentId: 3423,
        data: {
            //some data
        }
    },
    onSuccess: function(response) {
        // handle success
        console.log(response);
    },
    onError: function(error) {
        // handle error
        console.log(error);
    }
});
```

## Request method aliases

For convenience aliases have been provided for all supported request methods.

**instance.request(config)**

**instance.get(url[, config[, onSuccess[, onError]]])**

**instance.post(url[, config[, onSuccess[, onError]]])**

**instance.put(url[, config[, onSuccess[, onError]]])**

**instance.delete(url[, config[, onSuccess[, onError]]])**

**instance.patch(url[, config[, onSuccess[, onError]]])**

## Request Config

```javascript
{
    // `path` is the server URL or URL pathname that will be used for the request
    path: '/user',

    // `method` is the request method to be used when making the request
    method: HttpClient.methods.GET, // default

    // `headers` are custom headers to be sent
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },

    // `params` are the URL parameters to be sent with the request
    params: {
        id: 12345
    },

    // `query` are the URL query GET-parameters to be sent with the request
    query: {
        page: 3
    },

    // `body` is the data to be sent as the request body
    body: {
        firstName: 'Sub-Zero'
    },
    
    /* `dataType` indicates the type of data to be sent with the request

        options are: 
            HttpClient.dataTypes.JSON
            HttpClient.dataTypes.URLENCODED
    */
    dataType: HttpClient.dataTypes.JSON, //default
    
    /* `responseType` indicates the type of data that the server will respond with

        options are: 
            HttpClient.responseTypes.JSON
            HttpClient.responseTypes.TEXT
    */
    responseType: HttpClient.responseTypes.JSON //default
}
```