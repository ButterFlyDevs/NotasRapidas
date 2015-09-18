angular.module('starter.controllers', [])


//Controlador DasControl
.controller('DashCtrl', function($scope, $cordovaSQLite) {
    /*Estamos implementando una función que se llama
    desde el código html desde un botón y a la que se le pasa como
    argumentos la información obtenida desde los campos de texto.
    */


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


.controller('indexController', function($scope) {



    /*
        Write some code directly over here
        without any function, and it will be executed every time your view loads.
        Something like this:
    */

    $scope.xyz = 1;
    alert(1);
})

//Controlador para la vista de notas
.controller('ChatsCtrl', function($scope, Chats, $cordovaSQLite) {
  $scope.notas= Chats.getNotas();
  $scope.doSomething = function(){
    alert("yeah");
  }


})
//Fin de este controlador.

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('AccountCtrl', function($scope) {
}


);
