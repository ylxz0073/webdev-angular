import {studentUrl} from '../constant';

export class SectionServiceClient {

  SECTION_URL = studentUrl + '/api/course/COURSEID/section';
  URL = studentUrl + '/api/section';
  findSectionsForStudent() {
    const url = studentUrl + '/api/student/:sid/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = studentUrl + '/api/student/:sid/section/' + sectionId;
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }
  unenrollStudentFromSection(sectionId) {
    const url = studentUrl + '/api/student/:sid/section/' + sectionId ;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  createSection(courseId, name, seats) {
    const section = {courseId, name, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  updateSection(sectionId, name, seats) {
    const section = {name, seats};
    return fetch(this.URL + '/' + sectionId, {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }
  deleteSection(sectionId) {
    const url = studentUrl + '/api/section/' + sectionId;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }
}
