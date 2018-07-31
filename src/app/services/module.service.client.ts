import {teacherUrl} from '../constant';

export class ModuleServiceClient {
  MODULE_URL = teacherUrl + '/api/course/COURSE_ID/module';
  findModulesForCourse(courseId) {
    return fetch(this.MODULE_URL.replace('COURSE_ID', courseId))
      .then(response => response.json());
  }
}
