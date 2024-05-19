import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { LessonComponent } from './lesson/lesson.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LessonForManagerComponent } from './lesson-for-manager/lesson-for-manager.component';
import { HomeComponent } from './home/home.component';
import { LessonsForStudentComponent } from './lessons-for-student/lessons-for-student.component';

const routes: Routes = [
 { path: 'lesson', component: LessonComponent},
 { path: 'category', component: CategoryComponent},
 { path: 'signup', component: SignUpComponent},
 {path:'login',component:LoginComponent},
 {path:'home',component:HomeComponent},
 {path:'lessonForManager',component:LessonForManagerComponent},
 {path:'LessonsForStudent',component:LessonsForStudentComponent},
 {path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
