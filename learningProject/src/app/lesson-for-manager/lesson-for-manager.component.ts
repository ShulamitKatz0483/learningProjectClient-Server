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
import {User}from '../User.model';
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
    studentInLesson: any[] = [];
    storedData: any;
    lessonDetails: LessonForManager=new LessonForManager();
    isUserLoggedIn: boolean = false;
    currentStudent:User=new User();
    displayedColumns: string[] = ['lessonName', 'lectureName', 'time', 'numOfStudents'];
    editLessonDetails: string[] = ['lessonName', 'lectureName', 'time', 'phoneNumber'];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    @ViewChild(MatSort) sort: MatSort = new MatSort();
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
        phoneNumber: new FormControl('')
    });
    dynamicContent: string = ''; // Initial content
    showEditSidebar = false;
    showDetailsSidebar = false;
    selectedLesson: LessonForManager | null = null;

    constructor(private lessonService: LessonService,
        private formBuilder: FormBuilder,
        private subCategoryService: SubCategoryService,
        private userService: UserService,
        private router: Router,
        private studenInLessonService: StudentInLessonService) { }
    async ngOnInit(): Promise<void> {
        await this.getLesson();
        await this.getSubCategory();
        await this.getUsers();
        await this.getStudent();
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
                    mergedLesson.idLesson = subCategory.idSubCategory;
                }
            });
            this.userData.forEach(user => {
                if (lesson.idLecturer === user.idUser) {
                    mergedLesson.lectureName = user.name;
                }
            });
            this.studentInLesson.forEach(student => {
                if (student.idLesson == lesson.idLesson) {
                    this.userData.forEach(user => {
                        if (student.idUser === user.idUser) {
                            this.currentStudent = user;
                            mergedLesson.students.push(this.currentStudent);
                        }
                    });
                }
            });
            mergedLesson.numOfStudents=mergedLesson.students.length;
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
            return nameMatch && timeMatch && lectureNameMatch;
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
            phoneNumber:"000",
          });       

    }

    editAndDetails(lesson: LessonForManager): void {

    }
    updateLessonDetails(){
        console.log(this.editLessonForm.value);
        
    }
    
      
}