import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB || '');
    console.log(colors.cyan.underline('DB successfully connected...'));
  } catch (error) {
    console.error(colors.red.underline('DB not connected...'));
    process.exit(1);
  }
};

export default connectDb;
