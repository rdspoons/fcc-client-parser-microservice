var http = require( 'http' ) ,
    port = 8080;

var server = http.createServer( function( req, res ) {
	var ip = req.headers[ 'x-forwarded-for' ] ,
	    lang = req.headers[ 'accept-language' ] ,
	    platform = req.headers[ 'user-agent' ] ;

	if(ip){ // ref: https://gist.github.com/qiao/1626318
		// use the first listed ip
		ip = ip.split(",")[0];
	} else {
		ip = req.connection.remoteAddress;
	}

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
