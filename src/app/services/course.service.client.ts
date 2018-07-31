import {teacherUrl} from '../constant';

export class CourseServiceClient {
  COURSE_URL = teacherUrl + '/api/course';
  findAllCourses() {
    return fetch(this.COURSE_URL)
      .then(response => response.json());
  }

  findCourseById(courseId) {
    return fetch(this.COURSE_URL + '/' + courseId)
      .then(response => response.json());
  }
}
