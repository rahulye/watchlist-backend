/** @format */

import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";

//Read the token from request and check is valid
const authMiddleware = async (req, res, next) => {
	let token;


	//check token exist in header
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1]; // [ "Bearer" , "asdas24bjnn5i6nj6u4i4.."]
	} else if (req.cookies?.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}

	//verify and extract userId
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRETKEY); // decoded = { id: userId, iat, exp }
		const user = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});

		if (!user) {
			return res.status(401).json({ error: "User not found. authorization failed." });
		}
    req.user = user;
		
		next();

	} catch (err) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
};

export default authMiddleware;
