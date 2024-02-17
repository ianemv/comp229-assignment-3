
const getErrorMessage= (errMsg) => {
	console.error(errMsg);
}

const handleError = (err, req, res) => {
	if (err) {
		return res.status(400).json({
			error: getErrorMessage(err)
		});
	}
};
export default  {
	handleError: handleError,
	getErrorMessage:getErrorMessage
};
