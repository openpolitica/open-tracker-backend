const responseBuilder = require('./response-builder')
const defaultHeader = {
    'Content-Type': 'application/json'
}

module.exports = function makeExpressCallback(controller) {
    return async (request, response) => {
        const apiRequest = {
            body: request.body,
            query: request.query,
            params: request.params,
            ip: request.ip,
            method: request.method,
            path: request.path,
            headers: request.headers,
            /**
             * If files upload are supported add these additional keys
             * file: request.file
             * files: request.files
             */       
        }

        try {
            const apiResponse = await controller(apiRequest, response);
            let headerResponse = defaultHeader;
            if (apiResponse && apiResponse.headers) {
                headerResponse = apiResponse.headers
            }
            
            response.set(headerResponse);
            responseBuilder.setSuccessResponse(apiResponse);
        } catch (error) {
            response.set(defaultHeader);
            responseBuilder.setErrorResponse(error);
        } finally {
            response.type('json');
            response.status(responseBuilder.getResponseStatusCode()).send(responseBuilder);
        }
    }
}