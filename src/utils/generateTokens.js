/** @format */

import jwt from "jsonwebtoken";

//JWT            -->  JWT = HEADER + PAYLOAD + SIGNATURE
// JWT signature
const generateTokens = (userId, res) => {
	const payload = { id: userId };  // we can send whatever data to be decoded to verify later
	const token = jwt.sign(payload, process.env.JWT_SECRETKEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});


	//COOKIE       -->  res.cookie("jwt", token, { httpOnly: true, secure, sameSite, maxAge })
	//JWT sent over cookie, automaticall for evey HTTP requests
	res.cookie("jwt", token, {  // store the cookie named it "jwt"
		httpOnly: true,           
		secure: process.env.NODE_ENV === "production", // Cookie sent only over https://
		sameSite: "strict", //stop the brower to sent this cookie in CORS
		maxAge: 1000 * 60 * 60 * 24 * 7, // (1000 * s * m * hrs) * days
	});

	// example output, jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
	return token;
};


export { generateTokens };
