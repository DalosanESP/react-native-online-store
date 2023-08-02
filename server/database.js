import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

//Establecemos la conexion con la base de datos
const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

//Aqui estan todas las funciones que realizan operaciones en la base de datos
export async function getProductByID(id) {
    const [row] = await con.query('SELECT * FROM producto WHERE id = ?',[id]);
    return row[0];
}

export async function getAllproducts() {
    const [result] = await con.query('SELECT * FROM producto order by nombre');
    return result
}

export async function createUser(name, email) {
    const [result] = await con.query('call addUser("' + name +'","' + email +'")',
    [name, email]);
}

export async function search(name) {
    const [result] = await con.query('SELECT * FROM producto where nombre like ?',
    ['%' + name + '%']);
    return result
}

export async function getUserByEmail(email) {
    const [result] = await con.query('SELECT * FROM users where email = ?',
     [email]);
    return result
}

export async function getCollection(coleccion) {
    const [result] = await con.query('SELECT * FROM producto where coleccion = ?',
     [coleccion]);
    return result
}

export async function addToCart(email,id) {
    const [result] = await con.query('INSERT INTO cart (user_email, id_producto) VALUES(?, ?);',
     [email,id]);
    return result
}

export async function getCart(email) {
    const [result] = await con.query('Select p.* from cart c, producto p , users u  where u.email = ? and c.user_email = u.email and p.id = c.id_producto',
     [email]);
    return result
}

export async function getTotal(email) {
    const [result] = await con.query('Select SUM(p.precio) as Total from cart c, producto p , users u  where u.email = ? and c.user_email = u.email and p.id = c.id_producto',
     [email]);
    return result
}

export async function deleteCart(id, email) {
    const [result] = await con.query('DELETE FROM cart WHERE id_producto = ? and user_email = ? limit 1',
    [id, email]);
    return result
}

export async function insertIdeas(nombre, descripcion, imagen, email, nombreUsuario) {
    var cleanImage = decodeURIComponent(imagen)
    const [result] = await con.query('INSERT INTO ideas (nombre, descripcion, imagen, user_email, user_nombre) values (?,?,?,?,?)',
    [nombre, descripcion, cleanImage, email, nombreUsuario]);
    return result
}

export async function getIdeas() {
    const [result] = await con.query('SELECT * FROM ideas order by nombre');
    return result
}

export async function getIdeasByID(id) {
    const [row] = await con.query('SELECT * FROM ideas WHERE id = ?',[id]);
    return row[0];
}

export async function getIdeasByEmail(email) {
    const [row] = await con.query('SELECT * FROM ideas WHERE user_email = ?',[email]);
    console.log(row)
    return row;
}

export async function updateIdeas(id, nombre, descripcion, imagen) {
    var validId = parseInt(id)
    var cleanImage = decodeURIComponent(imagen)
    console.log(cleanImage)
    const [row] = await con.query('update  ideas set nombre = ? , descripcion = ?, imagen = ? where id = ?',
    [nombre, descripcion, cleanImage, validId]);
    console.log(row)
    return row;
}

export async function deleteIdea(id) {
    const [result] = await con.query('DELETE FROM ideas WHERE id = ?',
    [id]);
    return result
}

export async function pagar(email) {
    const [result] = await con.query('DELETE FROM cart WHERE user_email= ?',
    [email]);
    return result
}