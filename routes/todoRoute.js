const express = require('express');

let router = express.Router();

const { todoRender, todoSubmit, todoEdit, todoRemove} = require("../controller/todoController");


router.get('/', todoRender);

router.post('/', todoSubmit);

router.post("/edit/:id", todoEdit);

router.get("/remove/:id", todoRemove);

module.exports = router;