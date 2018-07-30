import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModuleServiceClient} from '../services/module.service.client';
import {CourseServiceClient} from '../services/course.service.client';
import {Course} from '../models/course.model.client';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private courseService: CourseServiceClient, private  route: ActivatedRoute) {
    this.route.params.subscribe( params => this.setParams(params));
  }

  course: Course;
  courseId;
  courses: Course[] = [];
  setParams(params) {
    this.courseId = params['courseId'];
    // this.loadModules(this.courseId);
  }
  loadCourses() {
    this.courseService.findAllCourses()
      .then(courses => this.courses = courses);
  }

  selectCourse(courseId) {
    this.courseId = courseId;
  }

  ngOnInit() {
    this.loadCourses();
  }
}
