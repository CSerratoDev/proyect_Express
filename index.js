const express = require('express');
const app = express();

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido bro");
});

app.get("/:name", (req,res,next) => {
    var name = req.params.name;
    res.status(200);
    res.send("Hola, " + name);
});

app.listen(3000, () => {
    console.log('Server is running...')
});