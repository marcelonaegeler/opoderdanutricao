var express = require( 'express' )
  , app = express()
  , bodyParser = require( 'body-parser' )
  , session = require( 'express-session' )
  , mailer = require( 'express-mailer' )
  , mail_config = require( './config/mail' ) // File on .gitignore (sensitive data)
  , Clients = require( './models/Clients' )
  ;

// Configuration
app.use( express.static( 'public' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.set( 'view engine', 'pug' );

app.locals.title = 'O poder da Nutrição';

// Session
app.use( session( {
  secret: 'there\'s a secret'
  , resave: true
  , saveUninitialized: true
  , cookie: { secure: false }
}));


// Mailer
mailer.extend( app, {
  from: mail_config.email
  , host: 'smtp.gmail.com'
  , port: 465
  , secureConnection: true
  , transportMethod: 'SMTP'
  , auth: {
    user: mail_config.email
    , pass: mail_config.password
  }
});

// Routes
app.get( '/', function ( req, res ) {
  return res.render( 'index' );
});
app.get( '/sucesso', function ( req, res ) {
  return res.render( 'thank-you', req.session.client );
});

app.post( '/insterested', function ( req, res ) {
  Clients.add( req.body, function ( registered ) {
    req.session.client = registered;
    return res.redirect( '/sucesso' );

    return;
    if ( !registered ) { return false; }

    app.mailer.send(
      'emails/registered'
      , {
        to: req.body.email
        , name: req.body.name
        , subject: 'Muito obrigado!'
      }
      , function ( err ) {
        if ( err ) {
          req.flash( 'error', 'Houve um erro ao enviar o e-mail!' );
          return res.redirect( '/' );
        }
        return res.redirect( '/sucesso' );
      }
    );
  });
});

// Listen to
app.listen( 8081, function () {
  console.log('Running on 8081!');
});
