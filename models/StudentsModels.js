const dbConn = require("../config/database");

const StudentsModels = {
  /*=================================================*/
  /******************* Insers quers ******************/
  /*==================================================*/
  saveSt: async (stId, stName, stSemester, stEmail, stPhone, stAddress) => {
    const insertSt =
      "INSERT INTO `add_student` (st_ID,st_name,st_semester,st_email,st_phone,st_address) VALUES(?,?,?,?,?,?)";

    const values = [stId, stName, stSemester, stEmail, stPhone, stAddress];
    try {
      return await dbConn.promise().execute(insertSt, values);
    } catch (err) {
      return err;
    }
  },
  insertNumSem: async (id) => {
    const insertNumSemQ =
      "SELECT add_student.st_name, add_student.st_ID,add_student.st_table_id FROM add_student WHERE st_semester = ?";

    const values = [id];
    const [rows] = await dbConn.promise().execute(insertNumSemQ, values);

    return rows;
  },
  insertNumSemTwo: async (semId, subId) => {
    const insertNumSemTwoQ =
      "SELECT st_ID, st_name,st_table_id, mark_distribution.* FROM mark_distribution JOIN add_student on add_student.st_semester = sem_id JOIN add_subject on mark_distribution.sub_id = add_subject.subject_ID WHERE sem_id = ? AND sub_id = ?";
    const values = [semId, subId];
    const [rows] = await dbConn.promise().execute(insertNumSemTwoQ, values);
    return rows;
  },
  insertStMarks: async (
    studentId,
    subId,
    stWrNum,
    stVivaNum,
    stAssNum,
    stQuizNum
  ) => {
    const insertStMarksQ =
      "INSERT INTO `add_students_marks`(`st_table_id`, `sub_id`, `st_wrt_mark`, `st_viva_mark`, `st_ass_mark`, `st_quiz_mark`) VALUES (?,?,?,?,?,?)";
    const values = [studentId, subId, stWrNum, stVivaNum, stAssNum, stQuizNum];
    try {
      return await dbConn.promise().execute(insertStMarksQ, values);
    } catch (err) {
      return err;
    }
  },

  // view result query
  viewResult: async ([searchID]) => {
    const viewResultQ =
      "SELECT se_year, se_season, st_name, st_email, st_phone, se_id, se_season, subject_ID, subject_code, subject_type, credit_hour, subject_name, st_wrt_mark, st_viva_mark, st_ass_mark, st_quiz_mark FROM add_students_marks AS s_marks JOIN add_student AS std ON std.st_table_id = s_marks.st_table_id JOIN add_subject ON subject_ID = sub_id JOIN add_semester AS sem ON sem.se_id = std.st_semester WHERE std.st_ID = ?";

    const [rows] = await dbConn.promise().execute(viewResultQ, [searchID]);
    return rows;
  },
  // count subjrct  length for semester
  countSubLength: async ([searchID]) => {
    const subLenQ =
      "SELECT COUNT(subject) as Subject FROM add_subject_by_semester JOIN add_student std on semester_b_s = std.st_semester WHERE std.st_ID = ?";
    const [rows] = await dbConn.promise().execute(subLenQ, [searchID]);
    return rows;
  },

  /*=================================================*/
  /******************* Show quers ******************/
  /*==================================================*/

  // students count query
  getCountStudents: async () => {
    const countStudentsQ = "SELECT COUNT(st_ID) as allStudent FROM add_student";
    const [rows] = await dbConn.promise().execute(countStudentsQ);
    return rows;
  },
  // show grade list

  getGradeList: async () => {
    const gradeListQ = "SELECT * FROM `grade_distribution`";

    const [rows] = await dbConn.promise().execute(gradeListQ);
    return rows;
  },

  /*==============================================================*/
  /************************ Update Query  ************************/
  /*==============================================================*/
  getUpdateStForm: async (id) => {
    // const getStIdQ = "SELECT * FROM `add_student` WHERE st_ID=?";

    const getStIdQ =
      "SELECT add_student.st_table_id as stId, st_ID,st_name, se_year,se_season,st_email,st_phone,st_address FROM add_student JOIN add_semester WHERE add_student.st_semester = add_semester.se_id and st_table_id = ?";
    const values = [id];
    const [rows] = await dbConn.promise().execute(getStIdQ, values);
    return rows[0];
  },
  updateStFormSet: async (
    stId,
    stName,
    stSemester,
    stEmail,
    stPhone,
    stAddress,
    studentID
  ) => {
    const updateSetQ =
      "UPDATE `add_student` SET `st_ID`=?,`st_name`=?,`st_semester`=?,`st_email`=?,`st_phone`=?,`st_address`=? WHERE st_table_id = ?";
    const values = [
      stId,
      stName,
      stSemester,
      stEmail,
      stPhone,
      stAddress,
      studentID,
    ];
    const [rows] = await dbConn.promise().execute(updateSetQ, values);
    return rows.affectedRows;
  },

  /*==============================================================*/
  /************************ Delete Query  ************************/
  /*==============================================================*/
  getStDelete: async (id) => {
    const stDeleteQ = "DELETE FROM add_student WHERE st_table_id = ?";
    const values = [id];
    const [rows] = await dbConn.promise().execute(stDeleteQ, values);
    return rows.affectedRows;
  },

  /*=================================================*/
  /****************** Searching quers ****************/
  /*==================================================*/
  searchStID: async ([stID]) => {
    const seachStIdQ =
      "SELECT add_student.st_table_id as stId, st_ID,st_name, se_year,se_season,st_email,st_phone,st_address FROM add_student JOIN add_semester on add_student.st_semester = add_semester.se_id WHERE st_ID = ?";

    const [rows] = await dbConn.promise().execute(seachStIdQ, [stID]);
    return rows;
  },
};

//
module.exports = StudentsModels;
