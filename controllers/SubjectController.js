// const { getASubSearching } = require("../models/SubjectModel");
const SubjectModel = require("../models/SubjectModel");
const AppModels = require("../models/AppModels");
const SubjectController = {
  /*================= Searching quers ================*/
  showAsubject: async (req, res) => {
    const { aSubject } = req.body;
    const showSubjects = await SubjectModel.getASubSearching([aSubject]);
    //const showSubjects = await AppModels.getSub();
    res.render("pages/showSubject", { showSubjects, subjectLen: aSubject });
  },
  //
  showMarkDisErr: async (req, res) => {
    const { semId, subId } = req.query;
    const getError = await SubjectModel.getUseSubInMark(semId, subId);

    return res.json(getError);
  },

  /*=================================================*/
  /******************* Update Forms ******************/
  /*==================================================*/
  showUpdateSubForm: async (req, res) => {
    const subject_ID = req.params.subject_ID;
    const showSubjects = await SubjectModel.getUpdateSubForm(subject_ID);
    if (showSubjects) {
      res.render("edit/editSubjectForm", { showSubjects });
    } else {
      res.render("pages/error");
    }
  },

  updateSubFormSubmit: async (req, res) => {
    const { subCode, subType, subCredit, subName, subjectID } = req.body;
    console.log(req.body);

    const isSubSet = await SubjectModel.updateSubFormSet(
      subCode,
      subType,
      subCredit,
      subName,
      subjectID
    );
    if (isSubSet) {
      res.render("pages/success");
    } else {
      res.render("pages/error");
    }
  },

  /*=================================================*/
  /******************* Delete Subject *****************/
  /*==================================================*/
  subjectDelete: async (req, res) => {
    const subject_ID = req.params.subject_ID;
    const isDelete = await SubjectModel.getSubDelete(subject_ID);
    if (isDelete) {
      res.render("pages/success");
    } else {
      res.render("pages/error");
    }
  },
};

//
module.exports = SubjectController;
