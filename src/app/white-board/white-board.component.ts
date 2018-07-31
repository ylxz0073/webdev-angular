import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {SectionServiceClient} from '../services/section.service.client';
import {CourseServiceClient} from '../services/course.service.client';

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient) { }
  isDataLoaded = false;
  sections = [];
  courses = [];
  curUser;
  getCourseNames() {
    const actions = this.sections.map((section) => {
      return this.courseService.findCourseById(section.courseId);
    });
    return Promise.all(actions).then((data) => this.courses = data);
  }
  ngOnInit() {
    this.service.profile()
      .then((user) => this.curUser = user)
      .then( () => {
        if (this.curUser) {
          this.sectionService
            .findSectionsForStudent()
            .then(sections => {
              sections.forEach((section) => {
                this.sections.push(section.section);
              });
                console.log(this.sections);
              }
              ).then(() => this.getCourseNames())
            .then(() => this.isDataLoaded = true);
          }
  });
  }}
