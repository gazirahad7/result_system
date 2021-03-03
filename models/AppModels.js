const dbConn = require("../config/database");

const AppModls = {
  /*=================================================*/
  /******************* Insert quers ******************/
  /*==================================================*/
  /*====================  save semester form =======================*/

  saveSe: async (seYear, seSeason) => {
    const insertSe =
      "INSERT INTO `add_semester` (se_year,se_season) VALUES(?,?)";

    const values = [seYear, seSeason];
    // const query =
    try {
      return await dbConn.promise().execute(insertSe, values);
    } catch (err) {
      return err;
    }
  },
  /*====================  save subject form =======================*/

  saveSub: async (subCode, subType, subCredit, subName) => {
    const insertSub =
      "INSERT INTO `add_subject` (subject_code,subject_type,credit_hour,subject_name) VALUES(?,?,?,?)";

    const values = [subCode, subType, subCredit, subName];
    try {
      return await dbConn.promise().execute(insertSub, values);
    } catch (err) {
      return err;
    }
  },

  /*====================  save add subject by semester form =======================*/

  saveAddSubBySe: async (asbsSe, asbsSub) => {
    const aSBSQ =
      "INSERT INTO `add_subject_by_semester`(`semester_b_s`, `subject`) VALUES (?,?)";
    const values = [asbsSe, asbsSub];

    try {
      return await dbConn.promise().execute(aSBSQ, values);
    } catch (err) {
      return err;
    }
  },
  // insert mark distibuation
  saveMarkDis: async (
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
  ) => {
    const markDis =
      "INSERT INTO `mark_distribution`(`sem_id`, `sub_id`, `written_total`, `written_pass`, `viva_total`, `viva_pass`, `ass_total`, `ass_pass`, `quiz_total`, `quiz_pass`) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const values = [
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
    ];

    try {
      return await dbConn.promise().execute(markDis, values);
    } catch (err) {
      return err;
    }
  },

  /*=================================================*/
  /******************* Show quers ******************/
  /*==================================================*/
  getSe: async () => {
    const showSem = "SELECT * FROM `add_semester`";

    const [rows] = await dbConn.promise().execute(showSem);

    return rows;
  },
  getSub: async () => {
    const getSub = "SELECT * FROM `add_subject`";

    const [rows] = await dbConn.promise().execute(getSub);
    return rows;
  },
  // show semsester
  getSemester: async () => {
    const getSemQ = "SELECT * FROM `add_semester`";
    const [rows] = await dbConn.promise().execute(getSemQ);
    return rows;
  },

  /*=================================================*/
  /******************* JOIN quers ******************/
  /*==================================================*/
  showStQ: async () => {
    const showStQ =
      "SELECT add_student.st_table_id as stId, st_ID,st_name,  se_year,se_season,st_email,st_phone,st_address FROM add_student JOIN add_semester WHERE add_student.st_semester = add_semester.se_id";
    const [rows] = await dbConn.promise().execute(showStQ);

    return rows;
  },
  aSBSQ: async () => {
    const aSBSQ =
      "SELECT add_subject_by_semester.a_s_b_s as ASBSID, se_year,se_season,subject_name FROM add_subject_by_semester JOIN add_semester, add_subject WHERE add_subject_by_semester.semester_b_s = add_semester.se_id and add_subject_by_semester.subject = add_subject.subject_ID";
    const [rows] = await dbConn.promise().execute(aSBSQ);
    return rows;
  },
  getSubSem: async (id) => {
    const subSemQ =
      "SELECT add_subject_by_semester.subject, add_subject.subject_name,add_subject.subject_type,add_subject.credit_hour FROM `add_subject_by_semester` JOIN add_subject ON add_subject.subject_ID = add_subject_by_semester.subject WHERE semester_b_s = ?";
    const values = [id];
    const [rows] = await dbConn.promise().execute(subSemQ, values);

    return rows;
  },
  getStID: async (studentID) => {
    const stIDQ =
      "SELECT add_student.st_ID FROM add_student WHERE add_student.st_ID LIKE '" +
      studentID +
      "%'";
    //const values = [id];
    const [rows] = await dbConn.promise().execute(stIDQ);

    return rows;
  },
  /*=================================================*/
  /****************** Validation quers ****************/
  /*==================================================*/

  // subject  validation query
  getSubNam: async (subName) => {
    const subNamQ = `SELECT add_subject.subject_name FROM add_subject WHERE add_subject.subject_name LIKE '%${subName}%'`;

    const [rows] = await dbConn.promise().execute(subNamQ);
    return rows;
  },
  // semester validation query
  getUseSem: async (useSem) => {
    const useSemQ = `SELECT se_year,se_season FROM add_semester WHERE add_semester.se_year LIKE '%${useSem}%'`;

    const [rows] = await dbConn.promise().execute(useSemQ);
    return rows;
  },
  // subject validation query

  getUseSub: async (subId) => {
    const useSubQ =
      "SELECT * FROM add_subject_by_semester as ASBS JOIN add_subject as ASUB ON ASBS.subject = ASUB.subject_ID JOIN add_semester as ASEM ON ASBS.semester_b_s = ASEM.se_id WHERE ASBS.semester_b_s = ?";

    const values = [subId];

    const [rows] = await dbConn.promise().execute(useSubQ, values);

    return rows;
  },

  /*=================================================*/
  /******************** Count quers *******************/
  /*==================================================*/
  // count sem
  getCountSem: async () => {
    const countSemQ = "SELECT COUNT(se_id) as AllSemester FROM add_semester";
    const [rows] = await dbConn.promise().execute(countSemQ);

    return rows;
  },
};
//
module.exports = AppModls;
