var Clients = ( function () {
  var db = require( '../config/database' ).db;

  var add = function ( data, callback ) {
    db.collection( 'clients' ).findOne( { email: data.email }, function ( err, res ) {
      var isNew = false;
      if ( !res ) {
        db.collection( 'clients' ).insert( data );
        isNew = true;
      }
      callback( data, isNew );
    });

  };

  return {
    add: add
  };
})();

module.exports = Clients;
