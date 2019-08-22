import User from './user.model';

/**
 * Load user and append to req.
 */
const load = (req, res, next, id) => {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
};

/**
 * Get user
 * @returns {User}
 */
const get = (req, res) => {
  return res.json(req.user);
};

/**
 * Create new user
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
const create = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
  });

  user
    .save()
    .then((savedUser) => res.json(savedUser))
    .catch((e) => next(e));
};

/**
 * Update existing user
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
const update = (req, res, next) => {
  const user = req.user;
  user.name = req.body.name;
  user.mobileNumber = req.body.mobileNumber;

  user
    .save()
    .then((savedUser) => res.json(savedUser))
    .catch((e) => next(e));
};

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then((users) => res.json(users))
    .catch((e) => next(e));
};

/**
 * Delete user.
 * @returns {User}
 */
const remove = (req, res, next) => {
  const user = req.user;
  user
    .remove()
    .then((deletedUser) => res.json(deletedUser))
    .catch((e) => next(e));
};

export { load, get, create, update, list, remove };
