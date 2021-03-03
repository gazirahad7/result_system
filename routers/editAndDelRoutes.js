const editRouter = require("express").Router();
const AppController = require("../controllers/AppController");
const GradeController = require("../controllers/GradeController");
const StudentsController = require("../controllers/StudentsController");
const SubjectController = require("../controllers/SubjectController");

/*==============================================================*/
/************************ Get Routers  *************************/
/*==============================================================*/
editRouter.get("/update/:stId", StudentsController.showUpdateStForm);
editRouter.get(
  "/update-subject/:subject_ID",
  SubjectController.showUpdateSubForm
);
/*==============================================================*/
/************************ Post Routers  *************************/
/*==============================================================*/
editRouter.post("/update", StudentsController.updateStFormSubmit);
editRouter.post("/update-subject", SubjectController.updateSubFormSubmit);
/*==============================================================*/
/************************ Delete Routers  ***********************/
/*==============================================================*/
editRouter.get("/student-id-delete/:stId", StudentsController.studentDelete);
editRouter.get("/subject-delete/:subject_ID", SubjectController.subjectDelete);
//
module.exports = editRouter;
