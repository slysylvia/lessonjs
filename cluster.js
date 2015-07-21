var
  cluster = require( 'cluster' ),
  numCPUs = require( 'os' ).cpus().length,
  i = 0;

console.log( numCPUs );

if ( cluster.isMaster ) {

  // Fork workers.
  for ( ; i < numCPUs; i++ ) {
    cluster.fork();
  }

  Object.keys( cluster.workers ).forEach( function( id ) {
    console.log( 'I am running with ID : '+cluster.workers[ id ].process.pid );
  });

  cluster.on( 'exit', function( worker, code, signal ) {
    console.log( 'worker ' + worker.process.pid + ' died' );
  });
} else {

  // Workers can share any TCP connection
  // In this case it's a HTTP server
  require( './server.js' );
}
