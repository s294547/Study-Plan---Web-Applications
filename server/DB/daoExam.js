'use strict' ;

class ExamDAO {

    /**
     * CONSTRUCTOR: ExamDAO
     * ---------------------------------
     * @param {Object} generalPurposeDAO 
     */
    constructor (generalPurposeDAO) {
        this.dao = generalPurposeDAO;
    }


    /*
        + -------------------- +
        |        METHODS       |
        + -------------------- +
    */


    /**
     * Retrieve the list of exams from the DB
     * --------------------------------------
     */
     getExams = async () => {
        const querySQL = "SELECT E.code, E.name, E.credits, E.maxStudents, COUNT(DISTINCT SP.id) AS currentStudents, E.preparatory, E.incompatible FROM Exam E LEFT OUTER JOIN StudyPlan SP ON SP.code=E.code GROUP BY E.code";
        return this.dao.all(
            querySQL
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Retrieve a Study Plan, given its student “id”.
     * ------------------------------
     * @param {Number} id 
     */
     getStudyPlanById = async (id) => {
        const querySQL = "SELECT S.type, E.code, E.credits, E.name, E.maxStudents, COUNT(DISTINCT SP.id) AS currentStudents, E.preparatory, E.incompatible FROM Exam E LEFT OUTER JOIN StudyPlan SP ON SP.code=E.code LEFT OUTER JOIN Student S ON S.id=SP.id WHERE S.id=? GROUP BY E.code";
        return this.dao.all(
            querySQL,
            [
                id
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }


    /**
     * Add a new exam to the study plan of the student
     * ---------------------------
     * @param {Number} code 
     * @param {Number} id
     */
     newExam = async (code, id) => {
        const querySQL = "INSERT INTO StudyPlan(code, id) VALUES (?, ?)";
        return this.dao.run(
            querySQL,
            [
                code,
                id
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     *  Update the type of and existing studyplan corresponding to given user id in DB
     * -----------------------------------------------
     * @param {String} type
     * @param {Number} id 
     */
    editStudyPlanType = async (type, id) => {
        const querySQL = "UPDATE Student SET type = ? WHERE id == ?";
        return this.dao.run(
            querySQL,
            [
                type,
                id
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Delete an existing study plan, given its student "id".
     * -------------------------------------
     * @param {Number} id 
     */
     removeStudyPlan = async (id) => {
        const querySQL = "DELETE FROM StudyPlan WHERE id == ?";
        return this.dao.run(
            querySQL,
            [
                id
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }
}

module.exports = ExamDAO;