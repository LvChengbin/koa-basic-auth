# koa-basic-auth

A middleware for koa to add http basic authentication.

## Installation

```js
$ npm i @lvchengbin/koa-basic-auth --save
```

## Usage

```js
const Koa = require( 'koa' );
const auth = require( '@lvchengbin/koa-basic-auth' );

const app = new Koa();

// throw 401 if authentication failed
app.use( auth( 'username', 'password' ) );

app.listen( 3000 );
```

To use with a callback function:

```js
app.use( auth( 'username', 'password', ( result, ctx, next ) => {
    if( !result ) {
        ctx.body = 'has no permission';
    } else {
        next();
    }
} );

app.use( async ctx => {
    ctx.body = 'yep';
} );
```

To use the function as a ordinary function:

```js
const Koa = require( 'koa' );
const Router = require( '@lvchengbin/koa-router' );
const auth = require( '@lvchengbin/koa-basic-auth' );

const app = new Koa();
const router = new Router( app );

router.get( '/', async ctx => {
    if( auth( 'username', 'password', ctx ) ) {
        ctx.body = 'yes';
    } else {
        ctx.body = 'no';
    }
} );

app.listen( 3000 );
```
