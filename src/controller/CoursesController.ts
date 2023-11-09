import { Request, Response } from "express";

import { CoursesBusiness } from "../bussiness/CoursesBusiness";
import { BaseError } from "../errors/BaseError";

export class CoursesController {
  public getCourses = async (req: Request, res: Response) => {
    try {
      const coursesBusiness = new CoursesBusiness();
      const output = await coursesBusiness.getCourses();

      res.status(200).send({ message: output });
    } catch (error) {
      console.log(error);

      //Aqui usamos o BaseError agora como referência
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public postCourses = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        name: req.body.name,
        leasons: req.body.leasons,
      };

      const coursesBusiness = new CoursesBusiness();
      const results = await coursesBusiness.createCoursesBusiness(input);

      res.status(201).send(results);
    } catch (error) {
      console.log(error);

      //Aqui usamos o BaseError agora como referência
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deleteCourse = async (req: Request, res: Response) => {
    try {
      const input = {
        idToDelete: req.params.id,
      };

      const coursesBusiness = new CoursesBusiness();
      const results = await coursesBusiness.deleteCoursesBusiness(input);

      res.status(200).send("Usuario deletado com sucesso");
    } catch (error) {
      console.log(error);

      //Aqui usamos o BaseError agora como referência
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
