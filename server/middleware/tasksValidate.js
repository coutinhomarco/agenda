const validateBodyInfo = (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!status) {
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
    next();
  } catch (error) {
    next(error);
  }
};

export default { validateBodyInfo, validateParams };
