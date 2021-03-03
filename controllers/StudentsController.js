const StudentsModels = require("../models/StudentsModels");
const AppModls = require("../models/AppModels");
// const { json } = require("body-parser");
const GradeModel = require("../models/GradeModel");
const SubjectModel = require("../models/SubjectModel");

const StudentsController = {
  /*=================================================*/
  /******************* Get Requests ******************/
  /*==================================================*/

  getInsNumBySem: async (req, res) => {
    console.log("InsNumBySem", req.query);

    const { semester_id } = req.query;
    const numBySem = await StudentsModels.insertNumSem(semester_id);
    return res.json(numBySem);
  },
  getInsNumBySemTwo: async (req, res) => {
    const { semId, subID } = req.query;
    const marksBySem = await StudentsModels.insertNumSemTwo(semId, subID);
    return res.json(marksBySem);
  },
  getSearchReq: async (req, res) => {
    const { searchID } = req.body;
    const countSubLen = await StudentsModels.countSubLength([searchID]);
    console.log("count sub len", countSubLen);

    const showRes = await StudentsModels.viewResult([searchID]);
    const allGrades = await GradeModel.getGrades();
    res.render("pages/viewResult", {
      countSubLen,
      showRes,
      searchText: searchID,
      allGrades,
    });
  },

  /*===================== Search Request ========================*/
  getStIdReq: async (req, res) => {
    console.log(req.body);
    const { searchStId } = req.body;

    const showSts = await StudentsModels.searchStID([searchStId]);

    //res.render("pages/searchingStId", { showStss, searchStIDText: searchStId });
    res.render("pages/students", {
      showSts,
      searchStIDText: searchStId,
    });

    //return res.json(getStIdFM);
  },
  // show Grade point
  showStudentGPoint: async (req, res) => {
    const { studentId } = req.query;

    const allGrades = await GradeModel.getGrades();
    const allPassMarks = await GradeModel.getSetMarks(studentId);
    return res.json({ allGrades, allPassMarks });
  },
  // show  Insert number by semester
  showSemBySubject: async (req, res) => {
    const { semester_id } = req.query;
    const subBysem = await AppModls.getSubSem(semester_id);
    return res.json(subBysem);
  },

  /*=================================================*/
  /******************* Show pages ******************/
  /*==================================================*/

  //searching result
  searchingResult: async (req, res) => {
    res.render("pages/searchingResult");
  },
  // show grade list
  showGradeList: async (req, res) => {
    const gradeList = await StudentsModels.getGradeList();

    res.render("pages/showGradeList", { gradeList });
  },

  addStudent: async (req, res) => {
    const showSemester = await AppModls.getSe();
    const showSts = await AppModls.showStQ();

    res.render("pages/addStudentForm", { showSemester, showSts });
  },
  showStudents: async (req, res) => {
    const showSts = await AppModls.showStQ();

    res.render("pages/students", { showSts });
  },
  showStProfile: async (req, res) => {
    const stId = req.params.stId;

    const showStPro = await StudentsModels.getUpdateStForm(stId);
    res.render("pages/studentProfile", { showStPro });
  },

  showNumBySem: async (req, res) => {
    const showSemester = await AppModls.getSe();
    // const showSubjects = await AppModls.getSub();

    res.render("pages/insertNumBySem", { showSemester });
  },
  /*=================================================*/
  /******************* Insert Forms ******************/
  /*==================================================*/

  insertSt: async (req, res) => {
    const { stId, stName, stSemester, stEmail, stPhone, stAddress } = req.body;
    const insertedSt = await StudentsModels.saveSt(
      stId,
      stName,
      stSemester,
      stEmail,
      stPhone,
      stAddress
    );
    if (insertedSt.errno) {
      res.render("pages/error");
    } else {
      res.render("pages/success");
    }
  },
  insertStMark: async (req, res) => {
    const {
      studentId,
      subId,
      stWrNum,
      stVivaNum,
      stAssNum,
      stQuizNum,
    } = req.body;
    console.log("SudentID", studentId, stWrNum);

    let insertedMark;
    if (Array.isArray(studentId)) {
      for (let i = 0; i < studentId.length; i++) {
        insertedMark = await StudentsModels.insertStMarks(
          studentId[i],
          subId,
          stWrNum[i],
          stVivaNum[i],
          stAssNum[i],
          stQuizNum[i]
        );
      }
    } else {
      insertedMark = await StudentsModels.insertStMarks(
        studentId,
        subId,
        stWrNum,
        stVivaNum,
        stAssNum,
        stQuizNum
      );
    }

    if (insertedMark.errno) {
      res.render("pages/error");
    } else {
      res.render("pages/success");
    }
  },

  /*=================================================*/
  /******************* Update Forms ******************/
  /*==================================================*/
  showUpdateStForm: async (req, res) => {
    const stId = req.params.stId;

    const showSt = await StudentsModels.getUpdateStForm(stId);
    const showSemester = await AppModls.getSe();

    if (showSt) {
      res.render("edit/editStudentForm", { showSemester, showSt });
    } else {
      res.render("pages/error");
    }
  },
  updateStFormSubmit: async (req, res) => {
    const {
      stId,
      stName,
      stSemester,
      stEmail,
      stPhone,
      stAddress,
      studentID,
    } = req.body;
    const editSubmit = await StudentsModels.updateStFormSet(
      stId,
      stName,
      stSemester,
      stEmail,
      stPhone,
      stAddress,
      studentID
    );
    if (editSubmit) {
      res.render("pages/success");
    } else {
      res.render("pages/error");
    }
  },

  /*=================================================*/
  /******************* Delete Forms ******************/
  /*==================================================*/
  studentDelete: async (req, res) => {
    const stId = req.params.stId;
    const isStDel = await StudentsModels.getStDelete(stId);
    if (isStDel) {
      res.render("pages/success");
    } else {
      res.render("pages/error");
    }
  },
};

//
module.exports = StudentsController;
