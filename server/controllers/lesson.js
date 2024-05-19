const dal = require('../dal/lesson');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.create = async (req, res) => {
    console.log("cretae lesson" );
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some errors occured while creating the lesson." });
        })
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then((data) => {
            if (data) {
                console.log("!!");
                res.send(data);
            }
            else {
                console.log("!!");
                res.status(404).send({
                    message: `Cannot find lessons`
                });
            }
        })
}

exports.findOneById = async (req, res) => {
    const id = req.params.id;
    await dal.findOneById(id)
        .then((data) => {
            if (data) {
                console.log("!!");
                res.send(data);
            }
            else {
                console.log("!!");
                res.status(404).send({
                    message: `Cannot find this lesson ${id}`
                });
            }
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `lesson was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete lesson with id = ${id}. Maybe Course was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete course with id ${id}` })
        })
    }

    exports.update = async (req, res) => {
        const id = req.body.idLesson;
        await dal.update(req.body, id)
            .then(num => {
                if (num == 1)
                    res.send({ message: "lesson was updated successfully." });
                else res.send({ message: `Cannot update lesson with id = ${id}.Maybe lesson was not found or req.body is empty!` });
            });
    }
    