const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const upload = require("./utils/fileUpload");
const path = require("path");

const app = express();
const PORT = 2000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import Controllers
const authController = require("./controllers/authController");
const postsController = require("./controllers/postsController");
const usersController = require("./controllers/usersController");

// Import Midleware
const middleware = require("./middleware/auth");

// Define Routes
// Auth
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me", middleware.authenticate, authController.currentUser);

// login google
app.post("/auth/login-google", authController.loginGoogle);

// Posts
app.post("/posts", middleware.authenticate,  upload.single("picture"), postsController.create);
app.delete("/posts/:id", middleware.authenticate, postsController.deleteByID);
app.put("/posts/:id", middleware.authenticate, postsController.updateByID);

app.get("/users/:id/posts", usersController.getPostsByID);
app.get("/api/posts", postsController.getAll);
app.get('/api/posts/:id', postsController.getById);
app.delete("/users/:id",middleware.authenticate,middleware.isAdmin,usersController.deleteByID);

// Public Storage
app.use("/public/files", express.static(path.join(__dirname, "/storages")));

app.listen(PORT, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${PORT}`);
});