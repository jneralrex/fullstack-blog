exports.RespErr = (error, errMsg, res) => {
    res.json({
      status_code: 404,
      message: errMsg ? errMsg : error.message,
    });
  };
  