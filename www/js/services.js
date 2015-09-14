angular.module('starter.services', [])

//FActoria
.factory('Chats', function( $cordovaSQLite) {

  return {

    getNotas: function() {

      console.log("peticion notas");

      //Consulta en la base de datos
      if (window.cordova) {
        db = $cordovaSQLite.openDB({ name: "my.db" }); //device
      }else{
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
      }
          //Creamos un vector donde vamos a introducir las notas.
          var notas = [];
          var salida = null;
          var query = "SELECT * FROM people";
          var res = $cordovaSQLite.execute(db, query).then(function(res) {
              var len = res.rows.length;
              if(len>0) {
              for (var i = 0; i < len; i++) {
                notas.push({
                  titulo: res.rows.item(i).title,
                  texto: res.rows.item(i).text
                });
                console.log("SELECTED -> " + res.rows.item(i).title + " " + res.rows.item(i).text);
              }
            }
              if(res.rows.length > 0) {
                 console.log("SELECTED -> " + res.rows.item(0).title + " " + res.rows.item(0).text);
              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error(err);
          });
          return notas;
    } //Fin de la función getNotas()


  };
});
