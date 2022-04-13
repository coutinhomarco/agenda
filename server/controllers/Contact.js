const {Contact} = require("../sequelize/models");

const create = async (req, res, next) => {
  try {
    console.log(req.body);
    await Contact.create(req.body)
    return res.status(201).json({message: "Contact created successfully"});
  } catch (error) {
    next(error);
  }
};

module.exports = {create}