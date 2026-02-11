/** @format */

import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

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
	const user = await prisma.user.create({  //when prisma creates a user, the data returns to the const variable
		data: {
			name,
			email,
			password: hashPassword,
		},
	});

  res.status(201).json({
    status: "successful",
    data: {
      user: {
        id:user.id,
        name:user.name,
        email:user.email,
        password:user.password,
      }
    }
  })

  //JWT authentication
  
};

export { register };
