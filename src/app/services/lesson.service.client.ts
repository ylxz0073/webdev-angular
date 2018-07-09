export class LessonServiceClient {
  findLessonsForModule(moduleId) {
    return fetch('http://localhost:8080/api/course/:courseId/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
