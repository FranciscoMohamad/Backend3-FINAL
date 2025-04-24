import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};