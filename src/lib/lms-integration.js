// LMS Integration (Moodle, Canvas)
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * LMS Integration Manager
 */
export class LMSIntegration {
  constructor(platform, credentials) {
    this.platform = platform; // 'moodle' or 'canvas'
    this.credentials = credentials;
    this.baseUrl = credentials.baseUrl;
    this.apiKey = credentials.apiKey;
  }

  /**
   * Authenticate with LMS
   */
  async authenticate() {
    if (this.platform === 'moodle') {
      return this.authenticateMoodle();
    } else if (this.platform === 'canvas') {
      return this.authenticateCanvas();
    }
    throw new Error('Unsupported LMS platform');
  }

  async authenticateMoodle() {
    const response = await fetch(`${this.baseUrl}/login/token.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: this.credentials.username,
        password: this.credentials.password,
        service: 'moodle_mobile_app',
      }),
    });
    const data = await response.json();
    this.token = data.token;
    return data.token;
  }

  async authenticateCanvas() {
    // Canvas uses API key directly
    this.token = this.apiKey;
    return this.token;
  }

  /**
   * Sync course to LMS
   */
  async syncCourse(course) {
    if (this.platform === 'moodle') {
      return this.syncToMoodle(course);
    } else if (this.platform === 'canvas') {
      return this.syncToCanvas(course);
    }
  }

  async syncToMoodle(course) {
    const response = await fetch(`${this.baseUrl}/webservice/rest/server.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        wstoken: this.token,
        wsfunction: 'core_course_create_courses',
        moodlewsrestformat: 'json',
        'courses[0][fullname]': course.title,
        'courses[0][shortname]': course.id,
        'courses[0][categoryid]': '1',
        'courses[0][summary]': course.description,
      }),
    });
    return response.json();
  }

  async syncToCanvas(course) {
    const response = await fetch(`${this.baseUrl}/api/v1/accounts/self/courses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course: {
          name: course.title,
          course_code: course.id,
          description: course.description,
        },
      }),
    });
    return response.json();
  }

  /**
   * Sync student progress to LMS gradebook
   */
  async syncGrades(userId, courseId, grades) {
    if (this.platform === 'moodle') {
      return this.syncGradesToMoodle(userId, courseId, grades);
    } else if (this.platform === 'canvas') {
      return this.syncGradesToCanvas(userId, courseId, grades);
    }
  }

  async syncGradesToMoodle(userId, courseId, grades) {
    const response = await fetch(`${this.baseUrl}/webservice/rest/server.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        wstoken: this.token,
        wsfunction: 'core_grades_update_grades',
        moodlewsrestformat: 'json',
        source: 'innovision',
        courseid: courseId,
        component: 'mod_assign',
        grades: JSON.stringify(grades),
      }),
    });
    return response.json();
  }

  async syncGradesToCanvas(userId, courseId, grades) {
    const promises = grades.map(grade =>
      fetch(`${this.baseUrl}/api/v1/courses/${courseId}/assignments/${grade.assignmentId}/submissions/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submission: {
            posted_grade: grade.score,
          },
        }),
      })
    );
    return Promise.all(promises);
  }

  /**
   * Import students from LMS
   */
  async importStudents(courseId) {
    if (this.platform === 'moodle') {
      return this.importFromMoodle(courseId);
    } else if (this.platform === 'canvas') {
      return this.importFromCanvas(courseId);
    }
  }

  async importFromMoodle(courseId) {
    const response = await fetch(`${this.baseUrl}/webservice/rest/server.php?` + new URLSearchParams({
      wstoken: this.token,
      wsfunction: 'core_enrol_get_enrolled_users',
      moodlewsrestformat: 'json',
      courseid: courseId,
    }));
    return response.json();
  }

  async importFromCanvas(courseId) {
    const response = await fetch(`${this.baseUrl}/api/v1/courses/${courseId}/users`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });
    return response.json();
  }
}

/**
 * Save LMS configuration
 */
export async function saveLMSConfig(userId, config) {
  const docRef = doc(db, "lmsConfigs", userId);
  await setDoc(docRef, config, { merge: true });
}

/**
 * Get LMS configuration
 */
export async function getLMSConfig(userId) {
  const docRef = doc(db, "lmsConfigs", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}
