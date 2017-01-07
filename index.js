var http = require( 'http' ) ,
    port = 8080;

var server = http.createServer( function( req, res ) {
	var ip = req.connection.remoteAddress ,
	    lang = req.headers[ "accept-language" ] ,
	    platform = req.headers[ "user-agent" ] ;

	ip = ip.toString( ).replace( /[\s\S]+ffff:([\s\S]+)/ , "$1" ) ;
	// Restrict languag to first description per fcc example.
	lang = lang.split(",")[ 0 ] ;
	// Restrict software to platform per fcc example.
	platform = platform.replace( /.+\((.+)\).+/ , "$1" ) ;

	var json = { }
	json["ip"] = ip ;
	json["language"] = lang ,
	json["software"] = platform ;

	res.end( JSON.stringify( json ) ) ;
});

server.listen( process.env.PORT || Number( port ) ) ;
