const Queue = require('../models/queue')

exports.getAll = async function(req, res){
    try {
        const queues = await Queue.find()
        res.json(queues)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}
exports.add = async function(req, res){
        let now = new Date();let dateToday = new Date(now.getFullYear(),now.getMonth(),now.getDate())
        const queuesToday = await Queue.find({date_created: {$gte: dateToday}}).sort([['date_created', -1]])
        var transactionsNumber = 1
        if(queuesToday[0] != null) transactionsNumber = queuesToday[0].queueNumber +1 
        const queue = new Queue({
            queueNumber : transactionsNumber, 
            studentId : req.body.studentId,
            category: req.body.category
        })
        const error = queue.validateSync()
        if(error) return res.json(error)
        try {
            const newQueue = await queue.save()
            res.json({success: true, message: `Added to Queue with number ${transactionsNumber}`})
        } catch (error) {
            res.json(error.message)
        }
}
exports.getTransaction = async function(req, res){
    res.json(res.queue)
}
exports.attend = async function(req, res){
    res.queue.status = 'Attending'
    try {
        const updated = await res.queue.save()
        res.json({success: true, message: `Number ${updated.queueNumber} is now currently on transaction`})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}
exports.finish = async function(req, res){
    res.queue.status = 'Done'
    try {
        const updated = await res.queue.save()
        res.json({success: true, message: `Number ${updated.queueNumber} is finished`})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}
exports.getTransactionByNumber = async function(req, res, next){
    try {
        queue = await Queue.findOne({queueNumber : req.params.id})
        if(queue == null) return res.status(404).json({success: false, message: `Transaction not Found`})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
    res.queue = queue
    next()
}