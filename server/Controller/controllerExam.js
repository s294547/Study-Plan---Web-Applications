'use strict';

/* ---------- IMPORT MODULES ---------- */
const daoExam   = require('../DB/daoExam');

/* ---------- MESSAGES ---------- */
const MESSG_200 = {code: 200, message: 'OK'}
const MESSG_201 = {code: 201, message: 'CREATED'};
const MESSG_204 = {code: 204, message: 'NO CONTENT'};


/* ---------- CONTROLLER CLASS ---------- */
class ExamController {

    /**
     * CONSTRUCTOR OF THE CONTROLLER
     * -----------------------------
     * @param {DAO Object} input_dao 
     */
    constructor (input_dao) {
        this.dao = new daoExam(input_dao);
    }

    /**
     * Retrieve the list of all the available exams.
     * ---------------------------------------------
     *                API: GET /exams
     * =============================================
    */
    getExams = async () => {

        try {
            /* retrieving exams from DB */
            const exams = await this.dao.getExams();
            return {
                code: 200,
                message: exams
            }
        } catch (error) {
            throw error;
        }
    }


    /**
     * Retrieve a Study Plan, given its student “id” taken from the auth cookie.
     * ---------------------------------------------
     *             API: GET /studyplan
     * =============================================
    */
     getStudyPlanById = async (id) => {
        /* retrieving exams from DB */
        let exams = await this.dao.getStudyPlanById(id);
        return {
            code: 200,
            message: exams
        }
    }

     /**
     * Add a new exam to the study plan of the student 
     * with "id" taken from the auth cookie, the body of the request  
     * contains the code of the exam.
     * ---------------------------------------------
     *             API: POST /studyplan
     * =============================================
     */
      newExam = async (examCode,id) => {

        try {
            /* INSERTION IN THE DATABASE */
            await this.dao.newExam(examCode,id);

            return MESSG_201;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Update the type of and existing studyplan, by providing 
     * the user "id" in the auth cookie and by adding the new type
     * to the body of the request.
     * ---------------------------------------------
     *             API: PUT /studyplan
     * =============================================
    */
    editStudyPlanType = async (type, id) => {

        try {
            /* update studyplan in DB */
            await this.dao.editStudyPlanType(type, id);

            return MESSG_200;
        } catch (error) {
            throw error;
        }
    }



    /**
     * Delete an existing study plan, given its student "id" in the auth cookie.
     * ---------------------------------------------
     *            API: DELETE /studyplan/:id
     * =============================================
    */
     removeStudyPlan = async (id) => {

        try {
            /* remove exam from DB */
            await this.dao.removeStudyPlan(id);

            return MESSG_204;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ExamController;