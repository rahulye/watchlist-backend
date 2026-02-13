/** @format */

import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/generateTokens.js";

// REGISTER
const register = async (req, res) => {
	const { name, email, password } = req.body;

	//check user exist
	const useExist = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (useExist) {
		return res.status(400).json({ error: "User already exist dude.." });
	}

	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);

	//create user
	const user = await prisma.user.create({
		//when prisma creates a user, the data returns to the const variable
		data: {
			name,
			email,
			password: hashPassword,
		},
	});

	//JWT tokens
	const token = generateTokens(user.id, res);

	res.status(201).json({
		status: "successful",
		data: {
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			token,
		},
	});
};

// LOGIN
const login = async (req, res) => {
	const { email, password } = req.body;

	//check the user exist
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (!user) {
		res.status(401).json({ error: "Invalid email or password" });
	}

	//verify password
	const isValidPassword = bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		res.status(401).json({ error: "Invalid password or email" });
	}

	//JWT tokens
	const token = generateTokens(user.id, res);

	//response
	res.status(201).json({
		status: "successful",
		data: {
			user: {
				id: user.id,
				email: user.email,
			},
			token,
		},
	});
};

// LOGOUT

const logout = async (req,res) => {
	res.cookie("jwt","", {
		httpOnly:true,
		expiresIn:new Date(0),
	})
	res.status(201).json({
		status:"successful",
		messgae:"Logged out successfully",
	});
}
export { register, login , logout};
