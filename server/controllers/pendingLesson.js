const dal = require('../dal/pendingLesson');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some errors occured while creating the pendingLesson." });
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
                    message: `Cannot find pendingLessons`
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
                    message: `Cannot find this pendingLesson ${id}`
                });
            }
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `pendingLesson was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete pendingLesson with id = ${id}. Maybe Course was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete course with id ${id}` })
        })
    }

    exports.update = async (req, res) => {
        const id = req.body.idP
        endingLesson;
        await dal.update(req.body, id)
            .then(num => {
                if (num == 1)
                    res.send({ message: "pendingLesson was updated successfully." });
                else res.send({ message: `Cannot update pendingLesson with id = ${id}.Maybe pendingLesson was not found or req.body is empty!` });
            });
    }
    