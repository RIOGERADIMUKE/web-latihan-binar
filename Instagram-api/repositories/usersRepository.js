const { users, posts } = require("../models");

class UsersRepository {
  static async getByID({ id }) {
    const getUser = await users.findOne({ where: { id } });

    return getUser;
  }

  static async getByEmail({ email }) {
    const getUser = await users.findOne({ where: { email } });

    return getUser;
  }

  static async create({ name, email, password, role }) {
    const createdUser = users.create({
      name,
      email,
      password,
      role,
    });

    return createdUser;
  }

  static async deleteByID({ id }) {
    const deletedUser = await users.destroy({ where: { id } });

    return deletedUser;
  }

  static async getPostsByID({ id }) {
    const getPosts = await posts.findAll({ where: { user_id: id } });

    return getPosts;
  }
}

module.exports = UsersRepository;