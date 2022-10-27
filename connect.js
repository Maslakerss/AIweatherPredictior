const mysql = require('mysql/promise');


const connection = await mysql.createConnection({
  host     : 'localhost',
  user     : 'maslakers',
  password : 'Chm5Tnb2AVrLbMH',
  database : 'pogoda'
});

// connection.connect(function(err) {
//     if(err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }


//     console.log('Connection was succesful');
// })


async function SELECT(values, table) {
    const query = `SELECT * FROM ${table} WHERE id == ${values[0]}`
    
    //const [rows, fields]
    return = await connection.execute(query)
}


async function INSERT(values, table) {
    let newValues = ""
  
    values.forEach(value => {
      newValues += value + ", "
    })
  
    const query = `INSERT INTO ${table}(columns[0], columns[])  VALUES(newValues)`
  
    return await connection.execute(query)
}


async function UPDATE(values, columns, table, id) {
    let newValues = ""
  
    for(let i = 0; i < values.length; i++) {
      newValues += columns[i] + " = " + values[id] + ", "
    }
  
    const query = `UPDATE ${table} SET ${newValues} WHERE id = ${id}`
  
    return await connection.execute(query)
}



function DELETE(values, table) {
    const query = `DELETE FROM ${table} WHERE id = ${values[0]}`
  
    return await connection.execute(query)
}



async function server() {
  

}

server()

//const query = '';
// Select(query)

connection.end()
