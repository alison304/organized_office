const express = require('express');
const { getUserList, getOneUser, createUser, updateUser, removeUser, login } = require("../controllers/user.controller");
const router = express.Router();

router.get('/', getUserList);
router.get('/:id', getOneUser);
router.post('/', createUser);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);

module.exports.userRouter = router;