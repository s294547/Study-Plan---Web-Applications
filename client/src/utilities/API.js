/*IMPORTING MODULES*/
import { StudyPlan, Exam} from "./exam";

/* ENDPOINTS INFORMATION */
const APIURL = 'http://localhost:3001';


/**
* Retrieve the whole list of exams from the DB
* ============================================
* 
* Connection to endpoint: '/exams'
*/

async function readExams() {

    /*FUNCTION TO SORT THE EXAM LIST IN ALPHABETICAL ORDER*/
    function SortArray(x, y){
        if (x.name < y.name) {return -1;}
        if (x.name > y.name) {return 1;}
        return 0;
    }

    const url = APIURL + '/exams';
    try {
        const response = await fetch(url);
        if (response.ok) {

            // process the response
            const list = await response.json();
            const examList = list.map((e)=>new Exam(e.code, e.name, e.credits, e.maxStudents, e.currentStudents, (e.incompatible==null)?[]:e.incompatible.split(","), (e.preparatory==null)?[]:[e.preparatory]));
            return examList.sort(SortArray);

        } else {

            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);

        }
    } catch (ex) {

        // network error
        console.log(ex);
        throw ex;

    }
}

/**
* Retrieve the study plan of a student from the DB, given its student "id" in the auth cookie.
* ============================================
* 
* Connection to endpoint: '/studyplan'
*/

async function readStudyPlan() {
    const url = APIURL + '/studyplan';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {

            // process the response
            const list = await response.json();
            const examList = list.map((e)=>new Exam(e.code, e.name, e.credits, e.maxStudents, e.currentStudents, (e.incompatible==null)?[]:e.incompatible.split(","), (e.preparatory==null)?[]:[e.preparatory]));
            const plan= new StudyPlan(examList, (list[0]===undefined)?"None":list[0].type);

            return plan;

        } else {

            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);

        }
    } catch (ex) {

        // network error
        console.log(ex);
        throw ex;

    }
}

/**
* Add an exam to the study plan of a student in the DB, given its student "id" in the auth cookie.
* ============================================
* @param {Number} examCode id of exam to be added 
*
* Connection to endpoint: '/studyplan'
*/

async function apiAddExam(examCode) {
    const obj={code: examCode}; 
    const url = APIURL + '/studyplan';
    try {

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {

            return true;

        } else {

            /* application errors (404, 500, ...) */
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);

        }
    } catch (ex) {

        /* network errors */
        console.log(ex);
        throw ex;

    }
}


/**
* Update the type of a study plan of a student in the DB, given its student "id" in the auth cookie.
* ============================================
* @param {String} newType type of study plan to be added 
*
* Connection to endpoint: '/studyplan'
*/

async function apiEditType(newType) {
    const url = APIURL + '/studyplan';
    const obj={type: newType}; 
    try {

        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (response.ok) {

            return true;

        } else {

            /* application errors (404, 500, ...) */
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);

        }
    } catch (ex) {

        // network error
        console.log(ex);
        throw ex;

    }
}


/**
* Remove a study plan of a student from the DB, given its student "id" in the auth cookie.
* ============================================
*
* Connection to endpoint: '/studyplan'
*/

async function apiRemoveStudyPlan() {
    const url = APIURL+ `/studyplan`;
    try {

        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        });

        if(response.ok) {

            return true;

        } else {

            /* application errors (404, 500, ...) */
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);

        }
    } catch(ex) {

        // network error
        console.log(ex);
        throw ex;

    }
}

/**
* Attempts to log the user in given its credentials inserted 
* in the login form
* ==========================================================
* 
* Connection to endpoint: '/user/sessions'
*/

 async function login (credentials){
        
    const url = APIURL + '/user/sessions';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        });
        if (response.ok) {

            /* processing the response */
            const user = await response.json();
            return user;
            
        } else {

            /* application errors (404, 500, ...) */
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);

        }
    } catch (error) {

        /* network errors */
        console.log(error);
        throw error;

    }
}

/**
 * Attempts to get the informations of the currently logged in user
 * ====================================
 * 
 * Connection to endpoint: '/user/sessions/current'
 */
async function getUserInfo(){
    const url = APIURL + '/user/sessions/current';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {

            /* processing the response */
            const student= await response.json();
            return student; 

        } else {

            /* application errors (404, 500, ...) */
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);

        }
    } catch (error) {

        /* network errors */
        console.log(error);
        throw error;

    }
}

/**
 * Attempts to log the current user out
 * ====================================
 * 
 * Connection to endpoint: '/user/sessions/current'
 */
 async function logout(){
    const url = APIURL + '/user/sessions/current';

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {

            /* processing the response */
            return null; 

        } else {

            /* application errors (404, 500, ...) */
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);

        }
    } catch (error) {

        /* network errors */
        console.log(error);
        throw error;

    }
}


export {readExams, readStudyPlan, apiAddExam, apiEditType, apiRemoveStudyPlan, getUserInfo, login, logout};