function handleError(err, callback){
    if(err){
        const error = {
            status: 400,
            userMessage: err.message,
        };
        callback(error, null);
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    handleError,
};