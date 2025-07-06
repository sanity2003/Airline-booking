const express =  require('express')
const {AuthRequestValidator} = require('../../middlewares/index')
const UserController = require('../../controller/user-controller')

const router  = express.Router()

router.post(
    '/signup',
    AuthRequestValidator.validateUserAuth,
    UserController.create)


router.post(
    '/signIn',
    AuthRequestValidator.validateUserAuth,
    UserController.signIn)

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)
router.get('/isAdmin',
    AuthRequestValidator.validateAdminRequest,
    UserController.isAdmin)
module.exports = router