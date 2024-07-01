import express from 'express';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 8080;

//rota pública - home
app.get('/home', (req, res) => {
    return res.status(200).json({ message: 'bem-vindo a home do cloudfy :)' });
})

//subindo servidor
app.listen(PORT, () => {
    console.log('server status: on-line');
})