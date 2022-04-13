const validateContactData = (req, res, next) => {
  try {

    const {name, email, phoneNumber} = req.body;
    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ message: 'Name, email and phone number are required' });
    }
    req.body.userId = req.tokenData.userId;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = {validateContactData};