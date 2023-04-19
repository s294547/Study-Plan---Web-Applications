'use strict';

/* ---------- IMPORT MODULES ---------- */
const express               = require("express");
const Controller            = require("../Controller/controllerExam");
const DAO                   = require("../DB/dao");
const { param }             = require('express-validator');
const { header }            = require('express-validator');
const { body }              = require('express-validator');
const { validationHandler } = require("../Validator/validationHandler");
const { isLoggedIn }        = require('../Validator/loginHandler');

/* ---------- INITIALIZATIONS ---------- */
const router        = express.Router();
const dao           = new DAO();
const controller    = new Controller(dao);

/* --------- ERROR MESSAGES --------- */
const ERROR_500 = {code: 500, message: "INTERNAL SERVER ERROR"};

/* ---------- API DEFINITIONS ---------- */


/**
 *  API:
 *                  GET /exams
 *  ---------------------------------------------
 *  Retrieve the list of all the available exams.
 *  ---------------------------------------------
*/
router.get(
    "/exams",
    [
        body().custom(value => {  /*body should be empty */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler,
    async (request, response) => {
        try {
            const result = await controller.getExams();
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);


/**
 *  API:
 *           GET /studyplan
 *  ---------------------------------------------
 *  Retrieve a Study Plan, given its student “id”, retrieved from the auth cookie
 *  ---------------------------------------------
*/
router.get(
    "/studyplan",
    [
        body().custom(value => {  /* body should be empty */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.getStudyPlanById(request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);


/**
 *  API:
 *                  POST /studyplan
 *  ---------------------------------------------
 * Add a new exam to the study plan of the student 
 * with "id", the body of the request  
 * contains the code of the exam.
 *  ---------------------------------------------
*/
router.post(
    "/studyplan",
    [   
        header('Content-Type').equals('application/json'),  /*Request header has a line: Content-Type: application/json. */
        body('code').isString()                           /*the exam code is a string */              
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.newExam(request.body.code, request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);

/**
 *  API:
 *                  PUT /studyplan
 *  ---------------------------------------------
 * Update the type of and existing studyplan, by providing 
 * the user "id" in the auth cookie and by adding the new type
 * to the body of the request.
 *  ---------------------------------------------
*/
router.put(
    "/studyplan", 
    [
        header('Content-Type').equals('application/json'),  /*Request header has a line: Content-Type: application/json. */
        body().custom((body) => {                               /*type can be: None, Part Time, Full Time */
            return !(body.type!=="None" && body.type!=="Full Time" && body.type!=="Part Time");
        }),
        body('type').isString()                            /*type is a string */              
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.editStudyPlanType(request.body.type, request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);




/**
 *  API:
 *              DELETE /studyplan
 *  ---------------------------------------------
 *  Delete an existing studyplan, given its user “id”.
 *  ---------------------------------------------
*/
router.delete(
    "/studyplan", 
    [
        body().custom(value => {    /*body should be empty */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.removeStudyPlan(request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);



module.exports = router;