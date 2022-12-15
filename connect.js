const { NULL } = require('mysql/lib/protocol/constants/types');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const express = require('express')
const app = express();
const port = 1018;


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'maslakers',
  password : 'p.Xk)9]Bmqbwup.a',
  database : 'maslakers'
});



async function SELECT(table) {
  let res = await connection.promise().query(`SELECT * FROM ${table}`)

  return res;
}

async function _SELECT(id=0, table) {
  let res = await connection.promise().query(`SELECT * FROM ${table} WHERE uid = ${id}`);

  return res;
}


async function INSERT(query, id, table) {
  query = `INSERT INTO ${table} (uid, name, data) VALUES (` + id + `, '${query[0]}', '${query[1]}')`;

  let res = await connection.promise().query(query); 
  return res;
}



async function _UPDATE(data ,id = 0, table) {

  query = `UPDATE maslakers SET name = '${data[0]}', data = '${data[1]}' WHERE uid = ${id}`

  connection.query(query, function(err, rows, fields) {
    if(err) throw err;
  })
}


async function _DELETE(id, table) {
  query = `DELETE FROM maslakers WHERE uid = ${id}`;

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
  })
}



async function _AddUserPerms(data) {
	query = `INSERT INTO userperms(uid, pid, puid) VALUES(${data[0]}, ${data[1]}, NULL)`
    
    connection.query(query, function(err, row, fields) {
    	if (err) throw err;
    })
}

async function _AddPerms(data) {
	query = `INSERT INTO permissions VALUES(NULL, '${data[0]}', ${data[1]}, '${data[2]}')`
    
    connection.query(query, function(err, row, fields) {
    	if (err) throw err;
    })
}

async function _AddUser(data) {

	let query = `INSERT INTO users (timestamp, nazwisko, email, pesel, imie) VALUES ( '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}' )`;
	let res = await connection.promise().query(query)
    
    return res
}

async function AddUser(name, surname, email, pesel, tytul, isbn, autor) {
  let date = new Date();
  date = date.getUTCFullYear()         + '-' +
        (date.getUTCMonth() + 1)  + '-' +
        date.getUTCDate()       + ' ' +
        date.getUTCHours()     + ':' +
        date.getUTCMinutes()    + ':' +
        date.getUTCSeconds();
	

  let data = ["NULL", date, surname, email, pesel, name];
  let promise = _AddUser(data);
  let insertId;
  
  
  await promise.then(res => {
  	insertId = res[0].insertId;
  })


   console.log(date);


  data = [insertId, date, `Uzytkownik o id ${insertId} Zostal stworzony`]
  await _AddLogs(data)


  let newPromise = AddBook(tytul, isbn, autor);
  let bookId;

  await newPromise.then(res => {
  	console.log(res[0])
  	bookId = res[0].insertId;
  })
  // NIe dziala
  //await _AddWypozyczenia(insertId, bookId, date);
}

async function AddBook(tutyl, isbn, autor) {
	let query = `INSERT INTO ksiazki (id_ksiazki, tutyl, isbn, autor) VALUES (NULL, '${tutyl}', '${isbn}', '${autor}' )`;
	
	let res = await connection.promise().query(query);
	return res;
}


async function _AddLogs(data) {
	//nie dziala bo uzytkownik nie tworzy sie w czasie
	let query = `INSERT INTO usersLog (lid, uid, timestamp, log) VALUES (NULL, ${data[0]}, '${data[1]}', '${data[2]}' )`;
	console.log(query)

	let res = await connection.promise().query(query);
	return res;
}


async function _AddWypozyczenia(uid, id_ksiazki, timestamp) {
	let query = `INSERT INTO wypozyczenia (id_ksiazki, uid, data_wypozyczenia) VALUES (${uid}, '${id_ksiazki}', '${timestamp}' )`;
	console.log(query)

	let res = await connection.promise().query(query);
	return res;
}




async function connect() {
	await app.get('/', (req, res) => {
    	res.set('Content-Type', 'text/html');
    	res.sendFile("/home/maslakers/projekt/index.html");
    })


    await app.post('/data', async (req, res) => {
    	//const body = JSON(req.body);
    
        const name = req.body.imie;
        const surname = req.body.nazwisko;
        const email = req.body.email;
        const pesel = req.body.pesel;

        const tytul = req.body.ksiazka;
        const autor = req.body.wydawca;
        const isbn = req.body.isbn;

    	await AddUser(name, surname, email, pesel, tytul, isbn, autor);    
    
		res.json(req.body);
        console.log(name);
    
    
    	connection.end();
    })



    await app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })


  jason = JSON.stringify({opcje: "dsaaas", details: "rozne detale"})
  
  //let select = SELECT("permissions");
  
  //select.then(res => {
  //  console.log(res[0]);
  //})
}


connect();
