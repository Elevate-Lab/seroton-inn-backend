const express = require('express')
const User = require('../../models/userModel');
const router = express.Router()
const upload = require('../../middlewares/upload');

const { getUserProfile, updateProfile, addProfilePic, deleteProfile } = require('../../controllers/userController');

//Route to get Profile Details of a single User
router.get('/:user_id/getProfile',getUserProfile)

//Route to add Profile Photo of a user
router.route('/:user_id/addProfilePic').patch(upload.single("file"), addProfilePic);

//Route to update Profile Details(name, username,Profile Photo) of a user 
router.route("/:user_id/editUser").patch(upload.single("file"), updateProfile);

//Route to delete profile of a user
router.route('/:user_id/delete').patch(upload.single("file"), deleteProfile);
    
module.exports = router