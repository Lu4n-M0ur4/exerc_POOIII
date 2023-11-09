import express from "express";
import cors from "cors";

import { UserController } from "./controller/UserController";
import { CoursesController } from "./controller/CoursesController";
import { coursesRouter } from "./router/coursesRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});


const userController= new UserController()

app.post("/users/",userController.postUser);

app.get("/users",userController.getUsers);

app.put("/users/:id",userController.putUser);

app.delete("/users/:id", userController.deleteUser)





app.use('/courses', coursesRouter);
