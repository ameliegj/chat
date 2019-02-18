/*
Service methodes
*/
const sendApiSuccessResponse = (response, successMessage, data) => {
    return response.status(200).send({
        message: successMessage,
        err: null,
        data: data,
    })
}

const sendApiErrorResponse = (response, errorMessage, error) => {
    return response.status(500).json({
        message: errorMessage,
        error,
        data: null,
    });
}
// 

/*
Export service fonctions
*/
module.exports = {
    sendApiSuccessResponse,
    sendApiErrorResponse
};
//