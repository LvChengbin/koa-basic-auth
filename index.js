const auth = require( 'basic-auth' );

module.export = ( u, p, ctx ) {

    if( ctx ) {
        const user = auth( ctx );
        return user && user.name === u && user.pass === p;
    }

    return ( ctx, next ) => {
        const user = auth( ctx );

        if( user && user.name === u && user.pass === p ) {
            return next();
        }
        ctx.throw( 401 );
    }

};
