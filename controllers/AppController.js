const AppModls = require("../models/AppModels");
const StudentsModels = require("../models/StudentsModels");
const SubjectModel = require("../models/SubjectModel");

const AppController = {
  /*=================================================*/
  /******************* Get Request  ******************/
  /*==================================================*/

  getSubBySem: async (req, res) => {
    console.log(req.query);
    const { semester_id } = req.query;
    const subBysem = await AppModls.getSubSem(semester_id);

    return res.json(subBysem);
  },
  getStID: async (req, res) => {
    console.log("SID", req.body);
    const { studentID } = req.query;
    const getStId = await AppModls.getStID(studentID);

    return res.json(getStId);
  },
  /*=================================================*/
  /******************* Show pages  ******************/
  /*==================================================*/

  home: async (req, res) => {
    const coutSemester = await AppModls.getCountSem();
    const coutSubject = await SubjectModel.getCountSub();
    const countStudent = await StudentsModels.getCountStudents();

    res.render("pages/home", { countStudent, coutSemester, coutSubject });
  },

  addSemester: (req, res) => {
    res.render("pages/addSemesterForm");
  },
  addSubject: (req, res) => {
    res.render("pages/addSubjectForm");
  },

  showSub: async (req, res) => {
    const showSubjects = await AppModls.getSub();
    res.render("pages/showSubject", { showSubjects });
  },
  // insert number by semester
  addSubBySe: async (req, res) => {
    const showSubjects = await AppModls.getSub();
    const showSemester = await AppModls.getSe();

    res.render("pages/addSubBySeForm", { showSemester, showSubjects });
  },
  showASBS: async (req, res) => {
    const getASBS = await AppModls.aSBSQ();
    res.render("pages/showAsbs", { getASBS });
  },
  markDis: async (req, res) => {
    const showSemester = await AppModls.getSe();
    res.render("pages/markDistribution", { showSemester });
  },
  showGrad: async (req, res) => {
    res.render("pages/gradeDistribution");
  },
  // show semsester
  showSemester: async (req, res) => {
    const showSem = await AppModls.getSemester();
    res.render("pages/showSemester", { showSem });
  },

  /*=================================================*/
  /******************* Insert Form  ******************/
  /*==================================================*/
  /*====================  Insert semester form =======================*/

  insertSe: async (req, res) => {
    const { seYear, seSeason } = req.body;
    // console.log(req.body);

    const inserted = await AppModls.saveSe(seYear, seSeason);
    if (inserted.errno) {
      res.render("pages/error");
    } else {
      res.render("pages/success");
    }
  },
  /*====================  Insert subject form =======================*/

  insertSub: async (req, res) => {
    const { subCode, subType, subCredit, subName } = req.body;
    const insertedSub = await AppModls.saveSub(
      subCode,
      subType,
      subCredit,
      subName
    );
    if (insertedSub.errno) {
      res.render("pages/error");
    } else {
      res.render("pages/success");
    }
  },
  /*====================  Insert add subject by form =======================*/

  insertASBS: async (req, res) => {
    const { asbsSe, asbsSub } = req.body;
    const insertedASBS = await AppModls.saveAddSubBySe(asbsSe, asbsSub);
    if (insertedASBS.errno) {
      res.render("pages/error");
    } else {
      res.render("pages/success");
    }
  },
  /*==================== Mark Distibution insert form =======================*/

  insertMarkDis: async (req, res) => {
    const {
      semID,
      subId,
      wtTotalNum,
      wtPassNum,
      vivaTotalNum,
      vivaPassNum,
      assTotalNum,
      assPassNum,
      quTotalNum,
      quPassNum,
    } = req.body;

    const insertedMark = await AppModls.saveMarkDis(
      semID,
      subId,
      wtTotalNum,
      wtPassNum,
      vivaTotalNum,
      vivaPassNum,
      assTotalNum,
      assPassNum,
      quTotalNum,
      quPassNum
    );

    if (insertedMark.errno) {
      res.render("pages/error");
    } else {
      res.render("pages/success");
    }
  },

  /*=================================================*/
  /****************** Validation Form  ****************/
  /*==================================================*/

  //  subject validation controller
  showUseSub: async (req, res) => {
    console.log("Subject naem", req.query);
    const { useSubName } = req.query;
    const formApModle = await AppModls.getSubNam(useSubName);

    return res.json(formApModle);
  },
  // sem validation controller
  showUseSem: async (req, res) => {
    //console.log("Sem", req.query);
    const { newSem } = req.query;
    const formApModle = await AppModls.getUseSem(newSem);

    return res.json(formApModle);
  },
  // subject validation controller

  showUseSubNam: async (req, res) => {
    const { useSubjects } = req.query;
    console.log("Use Subject ID", req.query);

    const formApModleSub = await AppModls.getUseSub(useSubjects);

    return res.json(formApModleSub);
  },
};

//
module.exports = AppController;
