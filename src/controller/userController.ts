import {Request, Response} from 'express'
import {pool} from '../config/database';
import {v4} from 'uuid'

export const registerUser = async (req: Request, res: Response) => {
    const {name, email, pass, confirmPass} = req.body;

    try{

        const insertUserQuery = `INSERT INTO users(id, name, email, pass) VALUES(?,?,?,?)`;


        const id = v4();
        const values = [id, name, email, pass]

        const [data] = await pool.execute(insertUserQuery, values);


        return res.status(200).json({ message: 'usuário criado.' })


    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'erro no servidor.' })
    }
}