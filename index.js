var express = require( 'express' )
  , app = express()
  , bodyParser = require( 'body-parser' )
  , mailer = require( 'express-mailer' )
  , mongoskin = require( 'mongoskin' )
  , conn = mongoskin.db( 'mongodb://localhost:27017/opoderdanutricao', { native_parser: true } );
  ;

console.log( process.env );

// Configuration
app.use( express.static( 'public' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.set( 'view engine', 'pug' );

// Mailer
mailer.extend( app, {
  from: 'no-reply@opoderdanutricao.com.br',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'no-reply@opoderdanutricao.com.br',
    pass: ''
  }
});

// Routes
app.get( '/', function ( req, res ) {
  res.render( 'index', { title: 'O poder da nutrição' } );
});

app.post( '/insterested', function ( req, res ) {
  console.log( req.body );

  app.mailer.send( 'emails/registered', {
    to: req.body.email
    , name: req.body.name
    , subject: 'Test Email'
  }, function ( err ) {
    if ( err ) {
      console.log(err);
      res.send( 'There was an error sending the email' );
      return;
    }
    res.send( 'Email Sent' );
  });

  // res.redirect( '/' );
});

// Listen to
app.listen( 8081, function () {
  console.log('Running on 8081!');
});
