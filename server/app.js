import express from "express";
import { getAllproducts, getProductByID, createUser, search, getUserByEmail, getCollection, addToCart, getCart, getTotal, deleteCart, insertIdeas, getIdeas, getIdeasByID, getIdeasByEmail, updateIdeas, deleteIdea, pagar} from "./database.js";

const app = express();

app.use(express.json());

//Aqui se encuentran todas las direcciones a las cuales haremos peticiones desde la app


app.get("/all", async (req, res) => {
    const productos = await getAllproducts();
    res.status(200).send(productos);
});

app.get("/product/:id", async (req, res) => {
    const {id} = req.body;
    const product = await getProductByID(req.params.id, id);
    res.status(200).send(product);
});

app.get("/search/:name", async (req, res) => {
    const {name} = req.body;
    const product = await search(req.params.name, name);
    res.status(200).send(product);
});

app.post('/createUser', async (req, res) => {
var userProfile = req.body;
const product = await createUser(userProfile.name, userProfile.email);
res.status(201).send(product);
});

app.get('/users/:email', async (req, res) => {
    var email = req.body;
    const users = await getUserByEmail(email);
    res.status(200).send(users);
    });

app.get('/collection/:coleccion', async (req, res) => {
    const {coleccion} = req.body;
    const productCollection = await getCollection(req.params.coleccion, coleccion);
    res.status(200).send(productCollection);
    });

app.get('/addToCart/:email/:id', async (req, res) => {
    var id = req.params.id;
    var email = req.params.email;
    id = parseInt(id)
    const cart = await addToCart(email, id);
    res.status(201).send(cart);
    });

app.get('/getCart/:email', async (req, res) => {
    var email = req.params.email;
    const cart = await getCart(email);
    res.status(200).send(cart);
    });

app.get('/getTotal/:email', async (req, res) => {
    var email = req.params.email;
    const cart = await getTotal(email);
    res.status(200).send(cart);
    });

app.get('/deleteCart/:id/:email', async (req, res) => {
    var id = req.params.id;
    var email = req.params.email;
    await deleteCart(id, email);
    res.send({message: "Deleted"});
    });

app.get('/insertIdeas/:nombre/:descripcion/:imagen/:email/:nombreUsuario', async (req, res) => {
    var nombre = req.params.nombre;
    var descripcion = req.params.descripcion;
    var imagen = req.params.imagen;
    var email = req.params.email;
    var nombreUsuario = req.params.nombreUsuario
    console.log(email)
    const insert =await insertIdeas(nombre, descripcion, imagen, email, nombreUsuario);
    console.log(insert)
    res.status(201).send(insert);
    });

app.get("/ideas", async (req, res) => {
    const productos = await getIdeas();
    res.status(200).send(productos);
});

app.get("/ideas/:id", async (req, res) => {
    const {id} = req.body;
    const product = await getIdeasByID(req.params.id, id);
    res.status(200).send(product);
});

app.get("/misIdeas/:email", async (req, res) => {
    var email = req.params.email;
    console.log(email)
    const product = await getIdeasByEmail(email);
    res.status(200).send(product);
});

app.get("/updateIdeas/:id/:nombre/:descripcion/:imagen", async (req, res) => {
    console.log('llega')
    var id = req.params.id;
    var nombre = req.params.nombre;
    var descripcion = req.params.descripcion;
    var imagen = req.params.imagen;
    const product = await updateIdeas(id, nombre, descripcion, imagen);
    res.status(200).send(product);
    console.log("llega")
});

app.get('/deleteIdea/:id', async (req, res) => {
    var id = req.params.id;
    await deleteIdea(id);
    res.send({message: "Deleted"});
    });


app.get('/pagar/:email', async (req, res) => {
    var email = req.params.email;
    await pagar(email);
    res.send({message: "Deleted"});
    });

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

