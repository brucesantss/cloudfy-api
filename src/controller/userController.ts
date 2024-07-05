import {Request, Response} from 'express'
import {pool} from '../config/database';
import {v4} from 'uuid'

export const registerUser = async (req: Request, res: Response) => {
    const {name, email, pass, confirmPass} = req.body;

    try{

        //conferindo senha
        if(pass !== confirmPass){
            return res.status(400).json({ message: 'as senhas não coincidem' })
        }

        //conferindo email já cadastrado
        const existUserQuery = 'SELECT * FROM users WHERE email=?';
        const [rows, fields] = await pool.execute(existUserQuery, [email]);                

        // if(rows.length > 0){
        //     return res.status(500).json({ message: 'esse email já está sendo usado.' });
        // }

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

export const getAllUsers = async (req: Request, res: Response) => {

    try{
        const query = 'SELECT * FROM users';

        const [data] = await pool.execute(query);
        return res.status(200).json({ message: data })
    }catch(err){
        return res.status(500).json({ message: 'erro no servidor.' })
    }

}