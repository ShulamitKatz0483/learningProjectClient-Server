import { User } from "../app/User.model"
export class LessonForManager{
    lessonName: string="";
    time: string="";
    lectureName: string="";
    idLecture:number=0;
    idLesson:number=0;
    idSubCategory:number=0;
    students: User[] = [];
    numOfStudents=this.students.length;
    phoneNumber:string="";
    studentsInLesson:any[]=[];
}