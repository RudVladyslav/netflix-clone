import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from 'next'
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({message: 'Method not allowed'})
	}

	const existingUser = await prismadb.user.findUnique({
		where: {
			email: req.body.email
		}
	})

	if (existingUser) {
		return res.status(400).json({message: 'User already exists'})
	}

	const hashedPassword = await bcrypt.hash(req.body.password, 12)
	const user = await prismadb.user.create({
		data: {
			email: req.body.email,
			name: req.body.name,
			hashedPassword,
			image: '',
			emailVerified: new Date(),
		}
	})
	return res.status(201).json({message: 'User created'})

	try {
		const {email, name, password} = req.body
	} catch (error) {
		console.error(error)
		return res.status(500).json({message: 'Internal server error'})
	}

}
