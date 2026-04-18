const schemaOption = {
  timestamps: true,
  // enabled in future
  // timestamps: {
  //   createdAt: "created_at",
  //   updatedAt: "updated_at",
  // },
  toJSON: {
    versionKey: false,
    virtuals: true,
  },
};

export default schemaOption;
