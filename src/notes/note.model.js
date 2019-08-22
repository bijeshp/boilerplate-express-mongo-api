import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { ENTITY_TYPES } from '../../constants';
import lastModifiedPlugin from '../../utils/lastModifiedPlugin';
/**
 * Note Model
 */
const NoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/*================= Pre- Save hooks ================= */
NoteSchema.pre('save', (next) => {
  //TODO: validate user
  //TODO: validate user
  next();
});

/*================= Methods ================= */
NoteSchema.method({});

/*================= Statics ================= */
NoteSchema.statics = {
  /**
   * Get note
   * @param {ObjectId} id - The objectId of note.
   * @returns {Promise<note, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('_owner')
      .exec()
      .then((note) => {
        if (note) {
          return note;
        }
        const err = new APIError('No such note exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List notes in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of notes to be skipped.
   * @param {number} limit - Limit number of notes to be returned.
   * @returns {Promise<note[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate('_owner')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/*================= Plugins ================= */
NoteSchema.plugin(lastModifiedPlugin, {
  index: true,
});

/**
 * @typedef note
 */

const note = mongoose.model('note', NoteSchema);
export default note;
