import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { SubCategoryService } from '../services/sub-category.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LessonForManager } from '../LessonForManager.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { StudentInLessonService } from '../services/student-in-lesson.service';
import { User } from '../User.model';
import { NewLesson } from '../newLesson.model';
import { DavenService } from '../services/daven.service';
@Component({
    selector: 'app-lesson-for-manager',
    templateUrl: './lesson-for-manager.component.html',
    styleUrl: './lesson-for-manager.component.scss'
})
export class LessonForManagerComponent implements OnInit {
    dataNow: LessonForManager[] = [];
    lessonsData: any[] = [];
    subCategoryData: any[] = [];
    userData: any[] = [];
    davenData:any[]=[];
    studentInLesson: any[] = [];
    lessonDetails: LessonForManager = new LessonForManager();
    isUserLoggedIn: boolean = false;
    currentStudent: User = new User();
    displayedColumns: string[] = ['lessonName', 'lectureName', 'time', 'numOfStudents'];
    editLessonDetails: string[] = ['lessonName', 'lectureName', 'time', 'phoneNumber'];
    showFiller = false;
    selectedSubCategoryId: number=0;
    selectedUserId:number=0;
    lessonHour:string="";
    selectedDavenId:number=0;
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    filterForm: FormGroup = this.formBuilder.group({
        lessonName: new FormControl(''),
        time: new FormControl(''),
        lectureName: new FormControl(''),
        numOfStudents: new FormControl('')
    });
    editLessonForm: FormGroup = this.formBuilder.group({
        lessonName: new FormControl(''),
        time: new FormControl(''),
        lectureName: new FormControl(''),
        phoneNumber: new FormControl(''),
        idLesson: new FormControl(0),
        idLecture: new FormControl(0),
        idSubCategory: new FormControl(0),
        studentsInLesson: new FormControl([])

    });
    dynamicContent: string = ''; 
    showEditSidebar = false;
    showDetailsSidebar = false;
    selectedLesson: LessonForManager | null = null;

    constructor(private lessonService: LessonService,
        private formBuilder: FormBuilder,
        private subCategoryService: SubCategoryService,
        private userService: UserService,
        private router: Router,
        private studenInLessonService: StudentInLessonService,
        private davenService:DavenService
        ) { }
    async ngOnInit(): Promise<void> {
        await this.getLesson();
        await this.getSubCategory();
        await this.getUsers();
        await this.getStudent();
        await this.getDaven();
        this.margeData();
        const userData = localStorage.getItem('user');
        this.isUserLoggedIn = !!userData; // S
    }

    userOnMouseEnter() {
        const dataUser = localStorage.getItem('user');
        if (dataUser) {
            const userData = JSON.parse(dataUser); // Parse the JSON string to an object
            this.dynamicContent = userData.name;
        }
        else
            this.dynamicContent = 'Undefined';;
    }
    userOnMouseLeave() {
        this.dynamicContent = '';
    }
    async margeData() {
        this.lessonsData.forEach(lesson => {
            const mergedLesson = new LessonForManager();
            mergedLesson.time = lesson.time;
            this.subCategoryData.forEach(subCategory => {
                if (lesson.idSubCategory === subCategory.idSubCategory) {
                    mergedLesson.lessonName = subCategory.subCategoryName;
                    mergedLesson.idLesson = lesson.idLesson;
                    mergedLesson.idSubCategory = lesson.idSubCategory;

                }
            });
            this.userData.forEach(user => {
                if (lesson.idLecturer === user.idUser) {
                    mergedLesson.lectureName = user.name;
                    mergedLesson.idLecture = user.idUser;
                    mergedLesson.phoneNumber = user.phoneNumber;
                }
            });
            this.studentInLesson.forEach(student => {
                if (student.idLesson == lesson.idLesson) {
                    this.userData.forEach(user => {
                        if (student.idUser === user.idUser) {
                            this.currentStudent = user;
                            mergedLesson.students.push(this.currentStudent);
                            mergedLesson.studentsInLesson.push(student)
                        }
                    });
                }
            });
            mergedLesson.numOfStudents = mergedLesson.students.length;
            this.dataNow.push(mergedLesson);
        });

        this.lessonsData = this.dataNow;
        this.dataSource.data = this.lessonsData;
    }

    getLesson(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.lessonService.getData().subscribe(
                (data) => {
                    this.lessonsData = data;
                    console.log(data);

                    resolve(data);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    }
    getDaven(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.davenService.getData().subscribe(
                (data) => {
                    this.davenData = data;
                    console.log(data);

                    resolve(data);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    }

    getSubCategory(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.subCategoryService.getData().subscribe(
                (data) => {
                    this.subCategoryData = data;
                    resolve(data);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    }

    getUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userService.getData().subscribe(
                (data) => {
                    this.userData = data;
                    resolve(data);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    }

    getStudent(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.studenInLessonService.getData().subscribe(
                (data) => {
                    this.studentInLesson = data;
                    resolve(data);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    }

    applyFilters() {
        const filterValue = this.filterForm.value;

        this.dataSource.filterPredicate = (lesson: LessonForManager) => {
            const nameMatch = filterValue.lessonName ? lesson.lessonName.toLowerCase().includes(filterValue.lessonName.toLowerCase()) : true;
            const timeMatch = filterValue.time ? this.isTimeWithinRange(lesson.time, filterValue.time) : true;
            const lectureNameMatch = filterValue.lectureName ? lesson.lectureName.toLowerCase().includes(filterValue.lectureName.toLowerCase()) : true;
            const numOfStudentsMatch = filterValue.numOfStudents !== null && filterValue.numOfStudents !== undefined ?
            lesson.numOfStudents === parseInt(filterValue.numOfStudents) : true;
            return nameMatch && timeMatch && lectureNameMatch && numOfStudentsMatch;
        };

        this.dataSource.filter = Math.random().toString();

        if (this.dataSource.filteredData) {
            this.lessonsData = this.dataSource.filteredData;
        }
    }

    isTimeWithinRange(lessonTime: string, filterTime: string): boolean {
        const lessonDate = new Date();
        const filterDate = new Date();

        const [lessonHours, lessonMinutes] = lessonTime.split(':').map(Number);
        const [filterHours, filterMinutes] = filterTime.split(':').map(Number);

        lessonDate.setHours(lessonHours, lessonMinutes);
        filterDate.setHours(filterHours, filterMinutes);

        const rangeStart = new Date(filterDate.getTime() - 30 * 60000);
        const rangeEnd = new Date(filterDate.getTime() + 30 * 60000);
        return lessonDate >= rangeStart && lessonDate <= rangeEnd;
    }


    logOut() {
        localStorage.clear();
        this.isUserLoggedIn = false;
        this.router.navigate(['/lesson']);

    }
    getStudentDetail(lesson: LessonForManager): void {
        this.lessonDetails = lesson;
        this.editLessonForm.patchValue({
            lessonName: this.lessonDetails.lessonName,
            lectureName: this.lessonDetails.lectureName,
            time: this.lessonDetails.time,
            phoneNumber: lesson.phoneNumber,
            idLesson: lesson.idLesson,
            idLecture: lesson.idLecture,
            idSubCategory: lesson.idSubCategory,
            studentsInLesson: lesson.studentsInLesson
        });

    }
    async updateLessonDetails() {
        await this.updateLectureDetails();
        await this.updateSubCategoryDetails();
        const updateLesson = { idLesson: this.editLessonForm.value.idLesson, time: this.editLessonForm.value.time };
        console.log(updateLesson);
        await this.lessonService.updateLesson(updateLesson)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (error) => {
                    alert(error.error.message);
                }
            );
        window.location.reload();

    }
    updateLectureDetails() {
        const updateLecture = { idUser: this.editLessonForm.value.idLecture, name: this.editLessonForm.value.lectureName, phoneNumber: this.editLessonForm.value.phoneNumber };
        console.log(updateLecture);
        this.userService.updateUser(updateLecture)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (error) => {
                    alert(error.error.message);
                }
            );
    }
    updateSubCategoryDetails() {
        console.log(this.editLessonForm.value.idSubCategory);
        const updateSubCategory = { idSubCategory: this.editLessonForm.value.idSubCategory, subCategoryName: this.editLessonForm.value.lessonName };
        console.log(updateSubCategory);
        this.subCategoryService.updateSubCategory(updateSubCategory)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (error) => {
                    alert(error.error.message);
                }
            );
    }
    async deleteLesson() {
      //  await this.deleteStudentFromLesson();
        this.lessonService.deleteLesson(this.editLessonForm.value.idLesson)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (error) => {
                    alert(error.error.message);
                }
            );
            window.location.reload();
    }
    // deleteStudentFromLesson() {
    //     for (let i = 0; i < this.editLessonForm.value.studentsInLesson.length; i++) {
    //         const studentsInLesson = this.editLessonForm.value.studentsInLesson[i];
    //         this.studenInLessonService.deleteStudentFromLesson(studentsInLesson.idStudentInLesson)
    //             .subscribe(
    //                 (res) => {
    //                     console.log(res);
    //                 },
    //                 (error) => {
    //                     alert(error.error.message);
    //                 }
    //             );
    //     }
    // }
    addNewLesson(){
        const newLesson=new NewLesson(); 
        newLesson.idSubCategory= this.selectedSubCategoryId;  
        newLesson.idLecturer=this.selectedUserId;
        newLesson.time=this.lessonHour;
        newLesson.idDaven=this.selectedDavenId;
        console.log(newLesson);
        this.lessonService.addLesson(newLesson).subscribe(
            (res) => {
              console.log('Lesson added successfully:', res);
            },
            (error) => {
              console.error('Error adding Lesson:', error);
            }
          );
          window.location.reload();

    }

}