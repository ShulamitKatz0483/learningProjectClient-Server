const dal = require('../dal/user');

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
            res.status(500).send({ message: err.message || "Some errors occured while creating the User." });
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
                    message: `Cannot find Users`
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
                    message: `Cannot find this User ${id}`
                });
            }
        })
}
exports.findOneByEmail = async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).send('email is required!');
    }
    const found = await dal.findOneByEmail(email);
    if (!found) {
        return res.status(401).send({
            message: `Cannot find user by email = ${email}`
        })
    }
    else {
        return res.status(200).send(found);
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `User was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete User with id = ${id}. Maybe Course was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete course with id ${id}` })
        })
}

exports.update = async (req, res) => {
    const id = req.body.idUser;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "User was updated successfully." });
            else res.send({ message: `Cannot update User with id = ${id}.Maybe User was not found or req.body is empty!` });
        });
}
