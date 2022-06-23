const validateBodyInfo = (req, res, next) => {
  try {
    // const statusPossibilities = [0, 1, 2];
    const {
      title, description, status, tag,
    } = req.body;
    const statusNumber = Number(status);

    const tagNumber = Number(tag);
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    if (statusNumber > 2 || statusNumber < 0) {
      return res.status(400).json({ message: 'Status is required' });
    }

    if (tagNumber > 3 || tagNumber < 0) {
      return res.status(400).json({ message: 'Tag is required' });
    }
    console.log('passou aqui');
    req.body.tag = tagNumber;

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
