const dal = require('../dal/studentInLesson');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }
    let userLesson;
    const userLessons = await dal.findAllByIdUser(req.body.idUser);//all lessons of this student
    console.log("userLessons")
    console.log(userLessons)

    if (userLessons.length > 0) {
        console.log("req.body");
        console.log(req.body);
        userLesson = userLessons.find(userLesson => userLesson.dataValues.idLesson === req.body.idLesson);
    }
    if (userLesson) {
        console.log("userLesson");
        console.log(userLesson);
        return res.status(409).send({ message: 'Student already exists.' });
    }
    await dal.create(req.body)
        .then(data => { res.status(201); res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some errors occured while creating the studentInLesson." });
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
                    message: `Cannot find studentInLessons`
                });
            }
        })
}
exports.findAllByStudentId = async (req, res) => {
    const id = req.params.id;
    await dal.findAllByIdUser(id)
        .then((data) => {
            if (data) {
                console.log("!!");
                res.send(data);
            }
            else {
                console.log("!!");
                res.status(404).send({
                    message: `Cannot find studentInLessons`
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
                    message: `Cannot find this studentInLesson ${id}`
                });
            }
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `studentInLesson was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete studentInLesson with id = ${id}. Maybe Course was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete course with id ${id}` })
        })
}

exports.update = async (req, res) => {
    const id = req.body.idStudentInLesson;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "studentInLesson was updated successfully." });
            else res.send({ message: `Cannot update studentInLesson with id = ${id}.Maybe studentInLesson was not found or req.body is empty!` });
        });
}
