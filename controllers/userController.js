const User = require('../models/userModel');

//Function to send details of a user
exports.getUserProfile = async (req,res) => {
    try {
        var googleId = req.params.user_id;
        const userDetails = await User.find({googleId: googleId});
        res.json({user: userDetails});
    } catch (error) {
        return res.status(400).send(`Error: ${err}`);
    }
};

//Function to Upload profile photo
exports.addProfilePic = async (req,res) => {
    var userGoogleId = req.params.userGoogleId;
    User.findOne({googleId: userGoogleId}, async function(err,response) {
        if(err){
            res.status(404).send(`Error: ${err}`);
        }
        else{
            if(response.profilePic === null){
                try {
                    const profilePic = {
                        profilePic: req.file
                    }
                    const profilePicAdded = await User.findOneAndUpdate({ googleId: userGoogleId }, profilePic);
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
        var userGoogleId = req.params.userGoogleId;
        const userdetails = {
            username: req.body.username,
            name: req.body.name,
            profilePic: req.file
        }
        const userdetailsUpdated = await User.findOneAndUpdate({googleId : userGoogleId},userdetails);
        res.send({user: userdetails});
    } catch (err) {
        return res.status(400).send(`Error: ${err}`);
    }
}

//Function to delete a User
exports.deleteProfile = async (req,res) => {
    var userGoogleId = req.params.userGoogleId;
    User.findOne({ googleId: userGoogleId }, async function (err, response) {
        if (err) {
            res.status(404).send(`Error: ${err}`);
        }
        else {
            if (response.account_activation_status === true) {
                try {
                    await User.findOneAndUpdate({ googleId: userGoogleId }, {
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



