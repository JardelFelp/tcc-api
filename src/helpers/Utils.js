exports.defaultRequest = async (request = async () => {}, next = () => {}) => {
  try {
    await request();
  } catch (e) {
    next(e);
  }
};
