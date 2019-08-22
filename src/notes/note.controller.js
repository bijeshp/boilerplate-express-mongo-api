import Note from './note.model';
/**
 * Notes Controller
 */

/**
 * Load note and append to req.
 */
const load = (req, res, next, id) => {
  Note.get(id)
    .then((note) => {
      req.note = note; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
};

/**
 * Get note
 * @returns {Note}
 */
const get = (req, res) => {
  return res.json(req.note);
};

/**
 * Create new note
 * @property {text} req.body.text - The name of note.
 * @property {_owner} req.body._owner - The user id  created note.

 * @returns {note}
 */
const create = (req, res, next) => {
  const { text, _owner } = req.body;
  const note = new Note({
    text,
    _owner,
  });

  note
    .save()
    .then((savedNote) => res.json(savedNote))
    .catch((e) => next(e));
};

/**
 * Update existing note
 * @property {object} req.note - The updated note object.
 * @returns {Note}
 */
const update = (req, res, next) => {
  const conditions = {
    _id: req.note._id.toString(),
  };
  const updateDocument = { text: req.body.text };
  const options = { new: true };

  Note.findOneAndUpdate(conditions, updateDocument, options, (error, note) => {
    if (error) return next(error);
    return res.json(note);
  });
};

/**
 * Get note list.
 * @property {number} req.query.skip - Number of notes to be skipped.
 * @property {number} req.query.limit - Limit number of notes to be returned.
 * @returns {Note[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;
  Note.list({ limit, skip })
    .then((notes) => res.json(notes))
    .catch((e) => next(e));
};

/**
 * Delete note.
 * @returns {note}
 */
const remove = (req, res, next) => {
  const note = req.note;
  note
    .remove()
    .then((deletedNote) => res.json(deletedNote))
    .catch((e) => next(e));
};

export { load, get, create, update, list, remove };
