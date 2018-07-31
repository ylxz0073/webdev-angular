import {teacherUrl} from '../constant';

export class LessonServiceClient {
  findLessonsForModule(moduleId) {
    return fetch(teacherUrl + '/api/course/:courseId/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
