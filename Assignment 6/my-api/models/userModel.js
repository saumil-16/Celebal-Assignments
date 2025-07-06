const userData = require('../data/users');

class UserModel {
  static getAll(filters = {}) {
    let filteredUsers = userData.users;
    
    if (filters.name) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    
    if (filters.email) {
      filteredUsers = filteredUsers.filter(user => 
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    
    return filteredUsers;
  }

  static getById(id) {
    return userData.users.find(user => user.id === parseInt(id));
  }

  static create(userInfo) {
    const newUser = {
      id: userData.getNextId(),
      name: userInfo.name.trim(),
      email: userInfo.email.trim(),
      age: parseInt(userInfo.age)
    };
    
    userData.users.push(newUser);
    return newUser;
  }

  static update(id, userInfo) {
    const user = this.getById(id);
    if (!user) return null;
    
    user.name = userInfo.name.trim();
    user.email = userInfo.email.trim();
    user.age = parseInt(userInfo.age);
    
    return user;
  }

  static partialUpdate(id, userInfo) {
    const user = this.getById(id);
    if (!user) return null;
    
    if (userInfo.name !== undefined) user.name = userInfo.name.trim();
    if (userInfo.email !== undefined) user.email = userInfo.email.trim();
    if (userInfo.age !== undefined) user.age = parseInt(userInfo.age);
    
    return user;
  }

  static delete(id) {
    const userIndex = userData.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return null;
    
    return userData.users.splice(userIndex, 1)[0];
  }

  static emailExists(email, excludeId = null) {
    return userData.users.find(user => 
      user.email === email && (excludeId ? user.id !== excludeId : true)
    );
  }
}

module.exports = UserModel;