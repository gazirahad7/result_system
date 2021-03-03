const dbConn = require("../config/database");

//
const GradeModel = {
  /*=================================================*/
  /******************* Insert quers  ******************/
  /*==================================================*/

  // insert grade point
  saveGread: async (minNum, maxNum, gradePoint, gradeLatter) => {
    const insertGradeQ =
      "INSERT INTO `grade_distribution`(`min_num`, `max_num`, `grade_point`, `grade_latter`) VALUES (?,?,?,?)";

    const values = [minNum, maxNum, gradePoint, gradeLatter];

    try {
      return await dbConn.promise().execute(insertGradeQ, values);
    } catch (err) {
      return err;
    }
  },

  /*=================================================*/
  /******************* Show quers  ******************/
  /*==================================================*/
  getGrades: async () => {
    const allGrades =
      "SELECT min_num, max_num, grade_point, grade_latter FROM grade_distribution";
    const [rows] = await dbConn.promise().execute(allGrades);
    return rows;
  },
  /*=================================================*/
  /******************* JOIN quers  ******************/
  /*==================================================*/

  /*================= Marks quers ================*/
  getSetMarks: async (studentId) => {
    const setMarksQ =
      "SELECT sub_id,written_pass,viva_pass,ass_pass,quiz_pass FROM `mark_distribution` JOIN add_student ON st_semester = sem_id WHERE st_ID = ?";
    const [rows] = await dbConn.promise().execute(setMarksQ, [studentId]);

    return rows;
  },
};
//
module.exports = GradeModel;
