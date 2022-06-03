const validateBodyInfo = (req, res, next) => {
  try {
    const statusPossibilities = [0, 1, 2];
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!statusPossibilities.some((num) => num === status) || typeof status !== 'number') {
      return res.status(400).json({ message: 'Status is required' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateParams = (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!contactId) {
      return res.status(400).json({ message: 'ContactId is required' });
    }
    req.ids = { contactId: Number(contactId), userId: req.tokenData.userId };
    req.info = { ...req.body, ...req.ids };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateBodyInfo, validateParams };
