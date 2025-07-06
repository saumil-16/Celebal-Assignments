const validateUser = (userData) => {
  const { name, email, age } = userData;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push('Invalid email format');
  }

  if (!age || isNaN(age) || age < 0) {
    errors.push('Valid age is required');
  }

  return errors;
};

const validatePartialUser = (userData) => {
  const { name, email, age } = userData;
  const errors = [];

  if (name !== undefined && (!name || name.trim().length === 0)) {
    errors.push('Name cannot be empty');
  }

  if (email !== undefined && (!email || !/\S+@\S+\.\S+/.test(email))) {
    errors.push('Invalid email format');
  }

  if (age !== undefined && (isNaN(age) || age < 0)) {
    errors.push('Valid age is required');
  }

  return errors;
};

module.exports = {
  validateUser,
  validatePartialUser
};