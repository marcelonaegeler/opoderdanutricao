var mongoskin = require( 'mongoskin' )
  , conn = mongoskin.db( 'mongodb://localhost:27017/opoderdanutricao', { native_parser: true } );

module.exports = {
  mongo: mongoskin
  , db: conn
};
