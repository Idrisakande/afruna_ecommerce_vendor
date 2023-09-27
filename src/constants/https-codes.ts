export const STATUS_CODES = {
	"200": 200,
	"201": 201,
	"400": 400,
	"401": 401,
	"404": 404,
};

export const STATUS_MSG = (CODE: number) => {
	switch (CODE) {
		case STATUS_CODES[200]:
			return {
				description: "Request Successful",
				message: "OK",
			};
		case STATUS_CODES[201]:
			return {
				description: "Successfully created",
				message: "Created",
			};
		case STATUS_CODES[401]:
			return {
				description: "Request is not authorize",
				message: "Unauthorized",
			};
		default:
			return {
				description: "Request Error",
				message: "Error",
			};
	}
};

export const JWT_ERROR = {
	success: false,
	message: "jwt expired",
	error: {
		name: "TokenExpiredError",
		message: "jwt expired",
		expiredAt: "2023-08-21T14:34:37.000Z",
	},
};
