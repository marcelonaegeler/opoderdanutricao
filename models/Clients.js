var Clients = ( function () {
  var db = require( '../config/database' ).db;

  var add = function ( data, callback ) {
    db.collection( 'clients' ).findOne( { email: data.email }, function ( err, res ) {
      if ( !res ) {
        db.collection( 'clients' ).insert( data );
      }
      callback( data );
    });

  };

  return {
    add: add
  };
})();

module.exports = Clients;
