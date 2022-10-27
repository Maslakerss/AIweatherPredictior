const mysql = require('mysql/promise');


const connection =  mysql.createConnection({
  host     : 'localhost',
  user     : 'maslakers',
  password : 'Chm5Tnb2AVrLbMH',
  database : 'pogoda'
});

connection.connect(function(err) {
    if(err) {
        console.error('error connecting: ' + err.stack);
        return;
    }


    console.log('Connection was succesful');
})


async function SELECT(values, table) {
    const query = `SELECT * FROM ${table} WHERE id == ${values[0]}`
  
    const result = await connection.execute(query)
}


async function INSERT(values, table) {
    let newValues = ""
  
    values.forEach(value => {
      newValues += value + ", "
    })
  
    const query = `INSERT INTO ${table}(columns[0], columns[])  VALUES(newValues)`
  
    const result = await connection.execute(query)
}


async function UPDATE(values, table) {
    const result = await connection.execute(query)
}



function DELETE(values, table) {
    const query = `DELETE FROM ${table} WHERE id == ${values[0]}`
  
    const result = await connection.execute(query)
   
    return result[0].solution;
}



async function server() {
  

}

server()

//const query = '';
// Select(query)

connection.end()
