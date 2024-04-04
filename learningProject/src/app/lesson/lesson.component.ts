import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { SubCategoryService } from '../services/sub-category.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Lesson } from '../lesson.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { StudentInLessonService } from '../services/student-in-lesson.service';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
    dataNow: Lesson[] = [];
    lessonsData: any[] = [];
    subCategoryData: any[] = [];
    userData: any[] = [];
    storedData: any;
    isUserLoggedIn: boolean = false;
    displayedColumns: string[] = ['lessonName', 'lectureName', 'time'];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    @ViewChild(MatSort) sort: MatSort = new MatSort();
    filterForm: FormGroup = this.formBuilder.group({
        lessonName: new FormControl(''),
        time: new FormControl(''),
        lectureName: new FormControl('')
    });
    dynamicContent: string = ''; // Initial content

    constructor(private lessonService: LessonService,
        private formBuilder: FormBuilder,
        private subCategoryService: SubCategoryService,
        private userService: UserService,
        private router: Router,
        private studenInLessonService: StudentInLessonService) { }
    async ngOnInit(): Promise<void> {
        await this.getLesson();
        await this.getSubCategory();
        await this.getLectur();
        this.margeData();
        const userData = localStorage?.getItem('user');
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
            const mergedLesson = new Lesson();
            mergedLesson.time = lesson.time;
            this.subCategoryData.forEach(subCategory => {
                if (lesson.idSubCategory === subCategory.idSubCategory) {
                    mergedLesson.lessonName = subCategory.subCategoryName;
                    mergedLesson.idLesson = lesson.idLesson;
                }
            });
            this.userData.forEach(user => {
                if (lesson.idLecturer === user.idUser) {
                    mergedLesson.lectureName = user.name;
                }
            });
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

    getLectur(): Promise<any> {
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

    applyFilters() {
        const filterValue = this.filterForm.value;

        this.dataSource.filterPredicate = (lesson: Lesson) => {
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
    registerToLesson(lesson: Lesson) {
        const dataUser = localStorage.getItem('user');
        if (dataUser) {
            this.storedData = JSON.parse(dataUser);
            const studentInLesson = { idUser: this.storedData.idUser, idLesson: lesson.idLesson };
            console.log(studentInLesson);
            this.studenInLessonService.addStudentToLesson(studentInLesson)
                .subscribe(
                    (res) => {
                        console.log('your registered to lesson successfully:', res);
                        alert("your registered to lesson successfully");
                    },
                    (error) => {
                        alert(error.error.message);
                    }
                );
        } else {
            this.router.navigate(['/login']);
        }
    }
    logOut() {
        localStorage.clear();
        this.isUserLoggedIn = false;// S

    }


}