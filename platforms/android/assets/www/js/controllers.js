angular.module('starter.controllers', [])


//Controlador DasControl
.controller('DashCtrl', function($scope, $cordovaSQLite) {
    /*Estamos implementando una función que se llama
    desde el código html desde un botón y a la que se le pasa como
    argumentos la información obtenida desde los campos de texto.
    */
    $scope.saveOnDB=function(titulo, texto){

      console.log("Llamando a Guardar");

      /*Según la guía de IONIC podemos usar el almacenamiento
      local del navegador como almacenamiento simple de nuestra app.
      */
      window.localStorage['titulo']=titulo;
      window.localStorage['texto']=texto;

      //Vamos a intentar guardarlo en la BD

      var db = new PouchDB('notas');
      var todo = {
        _id: 'key',
        title: 'hola holita vecinito',
        completed: false
      };
      db.put(todo, function callback(err, result) {
        if (!err) {
          console.log('Successfully posted a todo!');
        }
      });

      console.log("intentando guardar");
      //alert(titulo);
      //alert(texto);
    };

    $scope.insert = function(titulo, texto) {
      if (window.cordova) {
        db = $cordovaSQLite.openDB({ name: "my.db" }); //device
      }else{
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
      }
        var query = "INSERT INTO people (title, text) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [titulo, texto]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }


})

.controller('ChatsCtrl', function($scope, Chats, $cordovaSQLite) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /*
  Esto es una manera fácil de guardar algún dato, clave-valor.
  luego para sacarlo en html sólo hay que hacer {{titulo}} y se mostrará.
  $scope.titulo = window.localStorage['titulo'];
  $scope.texto = window.localStorage['texto'];
  */

  //Función que recoge todos los chats
  //$scope.chats = Chats.all();

  //Vamos a intentar recoger todas la notas guardadas
  /*
  var db = new PouchDB('notas'); //Crea la base de datos o la abre si ya está creada
  $scope.nota=db.get('key').then(function (doc) {
    // handle doc
  }).catch(function (err) {
    console.log(err);
  });

  console.log($scope.nota);
*/
  $scope.notas= Chats.getNotas();





  //Una función que elemina un char
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}


);
