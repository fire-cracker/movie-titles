import express from 'express';
import moviesController from './movies.controller';


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'welcome',
    })
})

app.get('/movies', moviesController)

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});