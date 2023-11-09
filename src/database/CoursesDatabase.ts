import { CoursesDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CoursesDatabase extends BaseDatabase{
    public static TABLE_USER: string = "courses";


    
  public async getCourses(): Promise<CoursesDB[]> {
    const results:CoursesDB[] = await BaseDatabase.connection(
        CoursesDatabase.TABLE_USER
    );
   
    return results;
  }

  public async findCoursesById(id: string): Promise<CoursesDB| undefined> {
    const [userDB]: CoursesDB[] | undefined[] = await BaseDatabase.connection(
      CoursesDatabase.TABLE_USER
    ).where({ id });

    return userDB;
  }

  public async insertCourses(newCourseDB: CoursesDB) {
    await BaseDatabase.connection(CoursesDatabase.TABLE_USER).insert(newCourseDB);
  }
  public async deleteCoursesById(id: string): Promise<void> {
    await BaseDatabase.connection(CoursesDatabase.TABLE_USER).where({ id }).del();
  }



}