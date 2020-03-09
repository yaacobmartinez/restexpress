const express = require('express')
const Student = require('../models/student')


exports.getAll = async function(req, res){
    try {
        const students = await Student.find()
        res.json(students)
    } catch (error) {
        res.status(500).json({message: `Uh oh, something wrong happened`})
    }
}
exports.register = async function(req, res){
        const studentExists = await Student.findOne({studentId : req.body.studentId})
        if(studentExists) return res.status(500).json({success: false, message: `Student ID ${res.body.studentId} already exists`})
        const student  = new Student({
            studentId : req.body.studentId,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            year_level : req.body.year_level,
            course : req.body.course,
        })
        const er = student.validateSync();
        if(er) {
            const errors = Object.values(er.errors)
            const e = getErrors(errors)
            return res.status(500).json({success: false, errors: e})
        }
        try {
            const newStudent = await student.save()
            res.json({success: true, message: `Student with ID ${newStudent.studentId} registered`})
        } catch (error) {
            res.status(500).json({success: false, message: error})
        }
}

exports.getStudent = async function(req, res){
    res.json(res.student)
}

exports.updateStudent = async function(req, res){
    if(req.body.studentId != null) { res.student.studentId = req.body.studentId}
    if(req.body.first_name != null){ res.student.first_name = req.body.first_name }
    if(req.body.last_name != null){ res.student.last_name = req.body.last_name }
    if(req.body.year_level != null){ res.student.year_level = req.body.year_level }
    if(req.body.course != null){ res.student.course = req.body.course }
    try {
        const updatedStudent = await res.student.save()
        res.json({success: true, message: `Student with ID ${res.student.studentId} updated`})
    } catch (error) {
        res.status(500).json({success: false, message: `Uh oh something wrong happened`})
    }
}
exports.deleteStudent = async function(req, res){
    try {
        await res.student.remove()
        res.json({success: true, message: `Student with ID ${res.student.studentId} removed`})
    } catch (error) {
        res.status(500).json({success: false, message: `Uh oh something wrong happened`})
    }
}

exports.getStudentByID = async function getStudent(req, res, next){
    try {
        student = await Student.findOne({studentId: req.params.id})
        if(student == null) return res.status(404).json({success: false, message: `Student with that ID not found`})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
    res.student = student
    next()
}

function getErrors(error){
    var e = {}
    for (var key in error) {
        if (error.hasOwnProperty(key)) {
            e[error[key].properties['path']] = error[key].message
        }
     }
    return e
}