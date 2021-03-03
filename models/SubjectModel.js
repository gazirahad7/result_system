const dbConn = require("../config/database");

const SubjectModel = {
  /*=================================================*/
  /******************* Count quers  ******************/
  /*==================================================*/
  getCountSub: async () => {
    const countSubQ =
      "SELECT DISTINCT COUNT(subject_name) as AllSubject FROM add_subject";
    const [rows] = await dbConn.promise().execute(countSubQ);
    return rows;
  },

  /*=================================================*/
  /************** searching a subject ****************/
  /*==================================================*/
  getASubSearching: async (subject) => {
    const getASubQ =
      "SELECT * FROM `add_subject` WHERE subject_name LIKE '%" + subject + "%'";
    const [rows] = await dbConn.promise().execute(getASubQ);

    return rows;
  },

  /*=================================================*/
  /***************** Update query     ****************/
  /*==================================================*/
  getUpdateSubForm: async (id) => {
    const getSubQ = "SELECT * FROM `add_subject` WHERE subject_ID = ?";
    const subjectId = [id];
    const [rows] = await dbConn.promise().execute(getSubQ, subjectId);
    return rows[0];
  },
  updateSubFormSet: async (subCode, subType, subCredit, subName, subjectID) => {
    const subSetQ =
      "UPDATE `add_subject` SET `subject_code`=?,`subject_type`=? ,`credit_hour`=?,`subject_name`=? WHERE subject_ID = ?";
    const values = [subCode, subType, subCredit, subName, subjectID];
    const [rows] = await dbConn.promise().execute(subSetQ, values);
    return rows.affectedRows;
  },
  /*=================================================*/
  /***************** Delete Query  *******************/
  /*==================================================*/
  getSubDelete: async (id) => {
    const subDelQ = "DELETE  FROM add_subject WHERE subject_ID = ?";
    const subjectID = [id];
    const [rows] = await dbConn.promise().execute(subDelQ, subjectID);

    return rows.affectedRows;
  },
};

//
module.exports = SubjectModel;
