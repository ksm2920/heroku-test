const express = require('express');
const verifyUser = require('../middleware/verifyUser');

let router = express.Router();

const { todoRender, todoSubmit, todoEdit, todoRemove} = require('../controller/todoController');


router.get('/todo', verifyUser, todoRender);

router.post('/todo', verifyUser, todoSubmit);

router.post('/edit/:id', verifyUser, todoEdit);

router.get('/remove/:id', verifyUser, todoRemove);

module.exports = router;