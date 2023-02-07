function handleError(err, callback){
    if (err) {
        const error = {
            status: 500,
            userMessage: "Database error",
            systemMessage: err
        };
        callback(error, null);
        return true;
    }
    else{
        return false;
    }
}

function handleAbort(err, client, done, callback) {
    if (err) {
        let error = {
            status: 500,
            userMessage: "Database error",
            systemMessage: err
        };
        client.query('ROLLBACK', (rollbackErr) => {
            if (rollbackErr) {
                error = {
                    status: 500,
                    userMessage: "Database error",
                    systemMessage: {rollbackErr, err}
                };
            }
            // release the client back to the pool
            done()

            callback(error, null);
            return true;
        });
    }
    return false;
  }

module.exports = {
    handleError,
    handleAbort,
}