const express = require('express');
const app = express();
const {pokemon} = require("./pokedex.json");
const req = require('express/lib/request');

// donde estarán
app.use(express.json());
// como quiero recibirlos
app.use(express.urlencoded({ extended: true}));


/**HTTP 
 * GET - Obtener recursos
 * POST - Almacenar / Crear recursos
 * PATCH - Modificar una parte de un recurso
 * PUT - Modificar un recurso
 * DELETE - borrar un recurso
 */

app.get("/", (req, res, next) => {
    res.status(200).send("Bienvenido al Pokedex");
});

app.post("/pokemon", (req, res, next) => {
    return res.status(200).send(req.body);
});

app.get("/pokemon", (req,res,next) => {
    return res.status(200).send(pokemon);
});

app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
    const id = req.params.id -1;
    (id >= 0 && id <= 151) ? 
        res.status(200).send(pokemon[req.params.id - 1]) :
        res.status(404).send("Pokemon no encontrado");
});

app.get("/pokemon/:name([A-Za-z]+)", (req,res,next) => {
    // Operador ternario : condicion ? valor si verdadero : valor si falso
    const name = req.params.name;
    const pk = pokemon.filter((p)=>{
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });
    (pk.length > 0) ? 
        res.status(200).send(pk) : 
        res.status(404).send("Pokemon no encontrado");
});

app.listen(3000, () => {
    console.log('Server is running...')
});