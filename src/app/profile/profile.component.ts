import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {SectionServiceClient} from '../services/section.service.client';
import {Router} from '@angular/router';
import {CourseServiceClient} from '../services/course.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router) { }
  user;
  isDataLoaded = false;
  username;
  password;
  sections = [];
  courses = [];
  getCourses() {
    const actions = this.sections.map((section) => {
      return this.courseService.findCourseById(section.courseId);
    });
    return Promise.all(actions).then((data) => this.courses = data);
  }
  update() {
    this.service.updateUser(this.user._id, this.user)
      .then(user => {this.user = user;
       });
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }
  destroyUser() {
    if (confirm('Are you sure to destroy the user?')) {
      console.log('destroy');
      this.service.deleteUser()
        .then(() =>
          this.router.navigate(['home']));
    }
  }
  goToCourseSection(section) {
    const courseId = section.courseId;
    this.router.navigateByUrl('/course/' + courseId + '/section');
  }
  ngOnInit() {
    this.service.profile()
      .then((user) => this.user = user)
      .then( () => {
        if (this.user) {
          this.sectionService
            .findSectionsForStudent()
            .then(sections => {
                sections.forEach((section) => {
                  this.sections.push(section.section);
                });
                console.log(this.sections);
              }
            )
            .then(() => this.getCourses())
            .then(() => {
              this.isDataLoaded = true;
              this.courses.sort(function(a, b) {
                return a.id - b.id;
              });
              this.sections.sort(function(a, b) {
                return a.courseId - b.courseId;
              });
            });
        }
      });
  }


}
