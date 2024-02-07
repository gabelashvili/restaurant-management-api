import mongoose from 'mongoose';

const ProductCategorySchema = new mongoose.Schema(
  {
    name: {
      ka: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
  },
);

const ProductCategoryModel = mongoose.model('ProductCategory', ProductCategorySchema);

export default ProductCategoryModel;
