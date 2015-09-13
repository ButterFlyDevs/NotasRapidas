angular.module('starter.services', [])

.factory('Chats', function( $cordovaSQLite) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  /*
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];
  */
  return {
    /*
    all: function() {
      return chats;
    },
    */
    getNotas: function() {
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
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
