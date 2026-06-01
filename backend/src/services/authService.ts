import User from "../models/User";

// FIND USER

export const findUserByEmail = async (email: string) => {
  return User.findOne({
    email,
  });
};

// CREATE USER

export const createUser = async (userData: any) => {
  return User.create(userData);
};

// CHECK ACCOUNT ACTIVE

export const checkUserActive = (user: any) => {
  if (user.isDeactivated) {
    throw new Error("Account is deactivated");
  }
};
