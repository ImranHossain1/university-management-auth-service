/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
// const UserSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    passwordChangeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

/* UserSchema.methods.isUserExists = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  );
  return user;
};

UserSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
 */
UserSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};
UserSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  if (!user.needsPasswordChange) {
    user.passwordChangeAt = new Date();
  }
  next();
});
export const User = model<IUser, UserModel>('User', UserSchema);
