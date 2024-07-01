import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))

const PORT = process.env.PORT || 8080;

//rota pública - home
app.get('/home', (req, res) => {
    return res.status(200).json({ message: 'bem-vindo a home do cloudfy :)' });
})

//subindo servidor
app.listen(PORT, () => {
    console.log('server status: on-line');
})