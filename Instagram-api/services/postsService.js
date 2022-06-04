const postsRepository = require("../repositories/postsRepository");

class PostsService {
  static async create({ user_id, title, description, picture }) {
    try {
      if (!title) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!description) {
        return {
          status: false,
          status_code: 400,
          message: "Deskripsi wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!picture) {
        return {
            status: false,
            status_code: 400,
            message: "Gambar wajib diisi",
            data: {
                registered_user: null,
            },
        };
    }

      const createdPost = await postsRepository.create({
        user_id,
        title,
        description,
        picture
      });

      return {
        status: true,
        status_code: 201,
        message: "Post created successfully",
        data: {
          created_post: createdPost,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async deleteByID({ id, user_id }) {
    try {
      const getPost = await postsRepository.getByID({ id });

      if (getPost.user_id == user_id) {
        const deletedPost = await postsRepository.deleteByID({
          id,
        });

        return {
          status: true,
          status_code: 200,
          message: "Post deleted successfully",
          data: {
            deleted_post: deletedPost,
          },
        };
      } else {
        return {
          status: true,
          status_code: 401,
          message: "Resource Unauthorized",
          data: {
            deleted_post: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async getById({
    id,
}) {
    const getById = await postsRepository.getById({
        id,
    });
    return {
        status: true,
        status_code: 200,
        message: "success get data",
        data: {
            getdata: getById,
        },
    };
}

static async getAll() {
    const getAll = await postsRepository.getAll();

    return {
        status: true,
        status_code: 200,
        message: "Posts successfully loaded",
        data: {
            getDataAll: getAll,
        },
    };
}

  static async updateByID({ id, user_id, title, description }) {
    try {
      const getPost = await postsRepository.getByID({ id });

      if (getPost.user_id == user_id) {
        const updatedPost = await postsRepository.updateByID({
          id,
          title,
          description,
        });

        return {
          status: true,
          status_code: 200,
          message: "Post updated successfully",
          data: {
            updated_post: updatedPost,
          },
        };
      } else {
        return {
          status: true,
          status_code: 401,
          message: "Resource Unauthorized",
          data: {
            updated_post: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}

module.exports = PostsService;