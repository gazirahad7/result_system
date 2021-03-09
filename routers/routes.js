const router = require("express").Router();

const AppController = require("../controllers/AppController");
const GradeController = require("../controllers/GradeController");
const StudentsController = require("../controllers/StudentsController");
const SubjectController = require("../controllers/SubjectController");
const StudentsModels = require("../models/StudentsModels");
// const AppModls = require("../models/AppModels");
// const StudentsModels = require("../models/StudentsModels");

/*==============================================================*/
/************************ Get Routers  *************************/
/*==============================================================*/
/* ##################### App Controller Get ##########################*/

router.get("/", AppController.home);
router.get("/add-semester", AppController.addSemester);
router.get("/add-subject", AppController.addSubject);
router.get("/subjects", AppController.showSub);
router.get("/add-sub-by-se", AppController.addSubBySe);
router.get("/show-add-sub-by-se", AppController.showASBS);
router.get("/mark-dis-page", AppController.markDis);
router.get("/show-grad-sys", AppController.showGrad);
router.get("/show-semester", AppController.showSemester);

router.get("/get-sub-by-id", AppController.getSubBySem);
router.get("/get-student-id", AppController.getStID);
/* ##################### StudentController Get  ##########################*/
router.get("/add-student", StudentsController.addStudent);
router.get("/students", StudentsController.showStudents);
router.get("/show-insert-num-by-sem", StudentsController.showNumBySem);
router.get("/show-searching-result", StudentsController.searchingResult);
router.get("/show-grade-list", StudentsController.showGradeList);
router.get("/get-sem-by-sub-id", StudentsController.showSemBySubject);
router.get("/insert-marks-sem-by-sub", StudentsController.getInsNumBySemTwo);
router.get("/get-ins-num-by-sub-id", StudentsController.getInsNumBySem);
router.get("/student-profile/:stId", StudentsController.showStProfile);

/*==============================================================*/
/************************ Post routers  *************************/
/*==============================================================*/
/* ##################### App Controller Post  ##########################*/
router.post("/insert_se", AppController.insertSe);
router.post("/insert_sub", AppController.insertSub);
router.post("/insert_sub_by_se", AppController.insertASBS);
router.post("/insert-mark-dis", AppController.insertMarkDis);
router.post("/insert-grade-point", GradeController.insertGradePoint);
/* ##################### StudentController   ##########################*/
router.post("/insert_st", StudentsController.insertSt);
router.post("/insert-students-mark", StudentsController.insertStMark);
router.post("/search-student", StudentsController.getSearchReq);
router.post("/search-student-id", StudentsController.getStIdReq);
//
router.post("/search-subject-id", SubjectController.showAsubject);

/*==============================================================*/
/************************ Search routers  ***********************/
/*==============================================================*/

// validation get router
router.get("/get-use-sub-name", AppController.showUseSub);
router.get("/get-use-sem", AppController.showUseSem);
router.get("/get-use-subjects", AppController.showUseSubNam);

// grade point show
router.get("/get-grade-point", StudentsController.showStudentGPoint);
/*============================ others Routers============================*/
router.get("/get-double-insrt-mark-error", SubjectController.showMarkDisErr);
router.get(
  "/get-inserted-sem-by-sub-mark-for-st",
  StudentsController.showInsertedStMarksSemSub
);
/*============================ Exports Routers ============================*/
module.exports = router;
