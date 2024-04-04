import { User } from "../app/User.model"
export class LessonForManager{
    lessonName: string="";
    time: string="";
    lectureName: string="";
    idLesson:number=0;
    students: User[] = [];
    numOfStudents=this.students.length;
}