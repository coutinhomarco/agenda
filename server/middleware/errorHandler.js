module.exports = (error, _req, res) => res.status(500).json({ error: error.message });
