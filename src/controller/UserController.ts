import { Request, Response } from "express";
import { UsersDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { UserDB } from "../types";
import { UserBusiness } from "../bussiness/UserBusiness";

export class UserController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      const userBusiness = new UserBusiness();
      const users = await userBusiness.getUsers();

      res.status(200).send({ message: users });
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public postUser = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        name: req.body.name,
      };

      const userBusiness = new UserBusiness();
      const results = await userBusiness.createUserBusiness(input);

      res.status(201).send(results);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public putUser = async (req: Request, res: Response) => {
    try {
      const input = {
        idUser: req.params.id,
        id: req.body.id,
        name: req.body.name,
      };

      const userBusiness = new UserBusiness();
      const results = await userBusiness.putUser(input);

      res.status(200).send({ message: results });
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const input = {
        idToDelete: req.params.id,
      };

      const userBusiness = new UserBusiness()
      const results = await userBusiness.deleteUser(input)
    

      res.status(200).send("Usuario deletado com sucesso");
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
