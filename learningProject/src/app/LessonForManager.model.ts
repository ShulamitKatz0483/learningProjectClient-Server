import { User } from "./user.model";
export class LessonForManager{
    lessonName: string="";
    time: string="";
    lectureName: string="";
    idLesson:number=0;
    numOfStudents=0;
    students: User[] = []; // Array of User objects

}