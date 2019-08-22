const lastModifiedPlugin = (schema, options) => {
  var fieldModifiedAt = {
    modifiedAt: {
      type: Date,
    },
  };
  if (options && options.index) {
    if (options.es_type && typeof options.es_type != 'undefined') {
      fieldModifiedAt.modifiedAt.es_type = options.es_type;
    }
    if (options.es_indexed && typeof options.es_indexed != 'undefined') {
      fieldModifiedAt.modifiedAt.es_indexed = options.es_indexed;
    }
  }
  schema.add(fieldModifiedAt);
  if (options && options.index) {
    schema.path('modifiedAt').index(options.index);
  }
  schema.pre('save', function(next) {
    if (!this.modifiedAt) {
      this.modifiedAt = Date.now();
    }
    next();
  });

  schema.pre('update', function() {
    if (
      typeof this.updateLastModified == 'undefined' ||
      (typeof this.updateLastModified != 'undefined' && this.updateLastModified != false)
    ) {
      this.update(
        null,
        {
          $set: {
            modifiedAt: Date.now(),
          },
        },
        {
          runValidators: true,
        },
      );
    }
  });

  schema.pre('findOneAndUpdate', function() {
    if (
      typeof this.updateLastModified == 'undefined' ||
      (typeof this.updateLastModified != 'undefined' && this.updateLastModified != false)
    ) {
      this.update(
        null,
        {
          $set: {
            modifiedAt: Date.now(),
          },
        },
        {
          runValidators: true,
        },
      );
    }
  });
};

export default lastModifiedPlugin;
