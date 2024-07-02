import {Request, Response} from 'express'

export const registerUser = (req: Request, res: Response) => {
    const {name, email, pass, confirmPass} = req.body;

    return res.status(200).json({ message: email })
}