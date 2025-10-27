const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
app.use(express.json());
app.use(express.urlencoded({
     extended: false 
    }));

app.listen(port, () => {
    console.log(`Server started on port 3000`);
});

db.sequelize.sync()
    .then((result) => {
        app.listen(3000, () => {
            console.log(`Server started`);
        })
    })
    .catch((err) => {
        console.log(err);
    });



app.post('/komik', async (req, res) => {
    const data =  req.body;
    try{
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (error) {
        res.send(err);
    }
})

app.get('/komik', async (req, res) => {
    try{
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (err) {
        res.send(err);
    }
});

app.put('/komik', async (req, res) => {
    const id = req.query.id;
    const data = req.body;

    try{
        const komik = await db.Komik.findByPk(id);
        id(!komik){
            return res.status(404).send({ message: "Komik tidak tersedia"});
        }
        await komik.update(data);
        res.send({message: "Komik berhasil diupdate"});
    } catch (err) {
        res.status(500).send(err);
    }
});
