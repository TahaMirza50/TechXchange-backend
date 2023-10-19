const Router = require('express');

const router = Router();

const chatRoomController = require('../Controllers/ChatRoom.controller');
const authMiddleware = require('../Middleware/Auth.middleware');

router.get('/',authMiddleware.authenticateUser, chatRoomController.getAllChatRooms);

router.delete('/delete/:chatRoomID', authMiddleware.authenticateUser, chatRoomController.deleteChatRoom);

router.post('/create', authMiddleware.authenticateUser, chatRoomController.createChatRoom);

module.exports = router;