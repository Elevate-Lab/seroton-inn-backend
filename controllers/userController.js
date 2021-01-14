const User = require('../models/userModel');

//Function to send details of a user
exports.getUserProfile = async (req,res) => {
    try {
        var userId = req.params.user_id;
        const userDetails = await User.findById(userId);
        res.json({user: userDetails});
    } catch (error) {
        return res.status(400).send(`Error: ${err}`);
    }
};

//Function to Upload profile photo
exports.addProfilePic = async (req,res) => {
    var userId = req.params.user_id;
    User.findById(userId, async function(err,response) {
        if(err){
            res.status(404).send(`Error: ${err}`);
        }
        else{
            if(response.profilePic === null){
                try {
                    const profilePic = {
                        profilePic: req.file
                    }
                    const profilePicAdded = await User.findByIdAndUpdate(userId, profilePic);
                    res.send({ profilePic: profilePic });

                } catch (err) {
                    res.status(400).send(`Error: ${err}`);
                }
            }
            else{
                res.send({message: `Profile Photo already exist`});
            }
        }
    })
}

//Function to Update Profile Details
exports.updateProfile = async (req,res) => {
    try {
        var userId = req.params.user_id;
        const userdetails = {
            username: req.body.username,
            name: req.body.name,
            profilePic: req.file
        }
        const userdetailsUpdated = await User.findByIdAndUpdate(userId,userdetails);
        res.send({user: userdetails});
    } catch (err) {
        return res.status(400).send(`Error: ${err}`);
    }
}

//Function to delete a User
exports.deleteProfile = async (req,res) => {
    var userId = req.params.user_id;
    User.findById(userId, async function (err, response) {
        if (err) {
            res.status(404).send(`Error: ${err}`);
        }
        else {
            if (response.account_activation_status === true) {
                try {
                    await User.findByIdAndUpdate(userId, {
                        account_activation_status: false
                    }, function(error,response){
                        res.send({response});
                    });
                } catch (err) {
                    res.status(400).send(`Error: ${err}`);
                }
            }
            else {
                res.send({ message: `Already Deactivated` });
            }
        }
    })
}



