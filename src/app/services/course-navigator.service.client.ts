import {teacherUrl} from '../constant';
export class CourseNavigatorServiceClient {
  findAllCourses() {
    return fetch(teacherUrl + '/api/course')
      .then(response => response.json());

  }
  findAllModulesForCourse(courseId) {
    return fetch(teacherUrl + '/api/course/' + courseId + '/module')
      .then(response => response.json());
  }
}
