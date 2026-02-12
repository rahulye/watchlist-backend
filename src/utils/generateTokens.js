/** @format */

import jwt from "jsonwebtoken";
const generateTokens = (userId, res) => {
	const payload = { id: userId };
	const token = jwt.sign(payload, process.env.JWT_SECRETKEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", //stop the brower to sent this cookie in CORS
		maxAge: 1000 * 60 * 60 * 24 * 7, // (1000 * s * m * hrs) * days
	});
	return token;
};

export { generateTokens };
