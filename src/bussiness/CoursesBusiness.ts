import { CoursesDatabase } from "../database/CoursesDatabase";
import { BadRequestError } from "../errors/BadRequestErro";
import { Courses } from "../models/Courses";
import { CoursesDB } from "../types";

export class CoursesBusiness {
  public getCourses = async () => {
    const coursesDatabase = new CoursesDatabase();
    const coursesDB = await coursesDatabase.getCourses();

    const courses: Courses[] = coursesDB.map(
      (courseDB) => new Courses(courseDB.id, courseDB.name, courseDB.leasons)
    );

    return courses;
  };

  public createCoursesBusiness = async (input: any) => {
    const { id, name, leasons } = input;

    if (typeof id !== "string") {
      throw new BadRequestError("'id' deve ser string");
    }

    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string");
    }

    if (typeof leasons !== "number") {
      throw new BadRequestError("'id' deve ser string");
    }

    const coursesDatabase = new CoursesDatabase();
    const coursesDBExists = await coursesDatabase.findCoursesById(id);

    if (coursesDBExists) {
      throw new Error("'id' já existe");
    }

    const newCourse = new Courses(id, name, leasons); // yyyy-mm-ddThh:mm:sssZ

    const newCourseDB: CoursesDB = {
      id: newCourse.getId(),
      name: newCourse.getName(),
      leasons: newCourse.getLeasons(),
    };

    await coursesDatabase.insertCourses(newCourseDB);

    return newCourseDB;
  };

  public deleteCoursesBusiness = async (input: any) => {
    const { idToDelete } = input;

    if (typeof idToDelete !== "string") {
      throw new BadRequestError("'id' deve ser string");
    }

    const coursesDatabase = new CoursesDatabase();
    const coursesDBExists = await coursesDatabase.findCoursesById(idToDelete);

    if (!coursesDBExists) {
      throw new BadRequestError("'id' não encontrado");
    }

    const courses:Courses = new Courses(
        coursesDBExists.id,
        coursesDBExists.name,
        coursesDBExists.leasons
    );

    await coursesDatabase.deleteCoursesById(courses.getId());
  };
}
