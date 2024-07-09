import {pool} from '../config/database';
import bcrypt from 'bcrypt'
import {Request, Response} from 'express'
import {v4} from 'uuid'
import validator from 'validator';

export const registerUser = async (req: Request, res: Response) => {
    const {name, email, pass, confirmPass} = req.body;

    try{

         // conferindo se todos os campos estão presentes
         if (!name || !email || !pass || !confirmPass) {
            return res.status(400).json({ message: 'todos os campos são obrigatórios.' });
        }

        //conferindo senha
        if(pass !== confirmPass){
            return res.status(500).json({ message: 'as senhas não são iguais.' })
        }

        //conferindo email já cadastrado
        const existUserQuery = 'SELECT * FROM users WHERE email=?';
        const [rows]: any = await pool.execute(existUserQuery, [email]); //query verificando no db
    
        if(rows.length > 0){
            return res.status(200).json({ message: 'esse email já está sendo usado.' });
        }

        //conferindo email válido
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: 'formato de email inválido.' })
        }

        const formartPass = validator.isStrongPassword(pass, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 2,
            minSymbols: 2
        });
        if(!formartPass){
            return res.status(400).json({ message: 'mínimo 8 caracteres. incluindo mínimo de 2 símbolos e números. 1 letra maiúscula.' })

        }


        //criando hash de senha = + segurança
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(pass, salt);

        const id = v4(); //criar id com uuid

        //dados pra query: a query e dados a ser cadastrados
        const insertUserQuery = `INSERT INTO users(id, name, email, pass) VALUES(?,?,?,?)`;
        const values = [id, name, email, passwordHash]

        await pool.execute(insertUserQuery, values); //query no db

        return res.status(200).json({ message: 'usuário criado.' }) //deu certo ^^
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