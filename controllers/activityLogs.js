const Activity = require('../models/activityLogs')

exports.getAll = async function(req, res){
    try {
        const logs = await Activity.find()
        res.json(logs);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.Log = async function(req, res){
    const activity = new Activity({
        user : res._id,
        activity : req.body.activity,
    })
    try {
        const newActivity = await activity.save()
        res.status(200).send({})
    } catch (error) {
        res.status(500).json({message: `Uh oh, something wrong happened`})
    }
}