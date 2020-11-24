const app = require('express');
const router = app.Router();

const run = (res, req) => {
    console.log('hello')
}

router.get('/newsletter', /*Controller Function*/ run );