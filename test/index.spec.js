const Koa = require( 'koa' );
const Router = require( '@lvchengbin/koa-router' );
const request = require( 'supertest' );
const auth = require( '../index' );

const app = new Koa();
const router = new Router( app );


router.get( '/auth', async ctx => {
    ctx.body = auth( 'n', 'p', ctx ) ? 'yes' : 'no';
} );

app.use( auth( 'n', 'p' ) );

router.get( '/user', async ctx => {
    ctx.body = 'yes';
} );

const app2 = new Koa();
const router2 = new Router( app2 );

app2.use( auth( 'n', 'p', ( result, ctx, next ) => {
    if( !result ) {
        ctx.body = 'no';
    } else {
        next();
    }
} ) );

app2.use( async ctx => {
    ctx.body = 'yes';
} );


describe( 'basic-auth', () => {
    it( 'using as an ordinary function and FAILED', done => {
        request( app.listen() )
            .get( '/auth' )
            .expect( 'no' )
            .end( err => err ? done.fail( err ) : done() );
    } );

    it( 'using as an ordinary function and SUCCEED', done => {
        request( app.listen() )
            .get( '/auth' )
            .auth( 'n', 'p' )
            .expect( 'yes' )
            .end( err => err ? done.fail( err ) : done() );
    } );

    it( 'using as a koa middleware and no callback and F', done => {
        request( app.listen() )
            .get( '/user' )
            .expect( 401 ) 
            .end( err => err ? done.fail( err ) : done() );
    } );

    it( 'using as a koa middleware and no callback and S', done => {
        request( app.listen() )
            .get( '/user' )
            .auth( 'n', 'p' )
            .expect( 200 ) 
            .expect( 'yes' )
            .end( err => err ? done.fail( err ) : done() );
    } );

    it( 'using as a koa middleware with callback and F', done => {
        request( app2.listen() )
            .get( '/' )
            .expect( 'no' ) 
            .end( err => err ? done.fail( err ) : done() );
    } );

    it( 'using as a koa middleware with callback and S', done => {
        request( app2.listen() )
            .get( '/' )
            .auth( 'n', 'p' )
            .expect( 'yes' ) 
            .end( err => err ? done.fail( err ) : done() );
    } );
} );


