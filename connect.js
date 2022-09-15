const mysql = require('mysql');


const connection = mysql.createConnection({
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


function Select(query) {
    connection.query(queryOne, function (error, results, fields) {
        if (error) throw error;
        
        return results[0].solution;
      });
}

//const query = '';
// Select(query)

connection.end()