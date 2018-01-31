const is = require( '@lvchengbin/is' );
const auth = require( 'basic-auth' );

module.exports = ( u, p, fn ) => {

    if( fn && !is.function( fn ) ) {
        const user = auth( fn );
        return user && user.name === u && user.pass === p;
    }

    return ( ctx, next ) => {
        const user = auth( ctx );

        if( user && user.name === u && user.pass === p ) {
            if( is.function( fn ) ) {
                return fn( true, ctx, next );
            }
            return next();
        }
        if( is.function( fn ) ) {
            return fn( false, ctx, next );
        }
        ctx.throw( 401 );
    }

};
