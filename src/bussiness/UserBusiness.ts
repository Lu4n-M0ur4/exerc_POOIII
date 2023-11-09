import { UsersDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { UserDB } from "../types";

export class UserBusiness {
  public getUsers = async () => {
    const userDataBase = new UsersDatabase();
    const usersDB = await userDataBase.getUsers();

    const users: User[] = usersDB.map(
      (userDB) => new User(userDB.id, userDB.name, userDB.created_at)
    );
    return users;
  };
  public createUserBusiness = async (input: any) => {
    const { id, name } = input;

    if (typeof id !== "string") {
      throw new Error("'id' deve ser string");
    }

    if (typeof name !== "string") {
      throw new Error("'name' deve ser string");
    }

    const userDataBase = new UsersDatabase();
    const userDBExists = await userDataBase.findUserById(id);

    if (userDBExists) {
      throw new Error("'id' já existe");
    }

    const newUser = new User(id, name, new Date().toISOString()); // yyyy-mm-ddThh:mm:sssZ

    const newUserDB: UserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      created_at: newUser.getCreatedAt(),
    };

    await userDataBase.insertUser(newUserDB);

    return newUserDB;
  };
  public putUser = async (input: any) => {
    const { idUser, id, name } = input;

    const userDataBase = new UsersDatabase();
    const userDBExists = await userDataBase.findUserById(idUser);

    if (!userDBExists) {
      throw new Error("'id' não encontrado");
    }

    const user = new User(
      userDBExists.id,
      userDBExists.name,
      userDBExists.created_at
    );

    user.setId(id);
    user.setName(name);
    user.setCreatedAt(new Date().toISOString());

    const newUser: UserDB = {
      id: user.getId(),
      name: user.getName(),
      created_at: user.getCreatedAt(),
    };

    await userDataBase.updateUserById(idUser, newUser);

    return newUser;
  };
  public deleteUser = async (input: any) => {
    const { idToDelete } = input;

    if (typeof idToDelete !== "string") {
      throw new Error("'id' deve ser string");
    }

    const userDataBase = new UsersDatabase();
    const userDBExists = await userDataBase.findUserById(idToDelete);

    if (!userDBExists) {
      throw new Error("'id' não encontrado");
    }

    const user = new User(
      userDBExists.id,
      userDBExists.name,
      userDBExists.created_at
    );

    await userDataBase.deleteUserById(user.getId());
  };
}
