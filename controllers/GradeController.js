const GradeModel = require("../models/GradeModel");
const GradeController = {
  /*=================================================*/
  /******************* Insert Form  ******************/
  /*==================================================*/

  // save grade point
  insertGradePoint: async (req, res) => {
    const { minNum, maxNum, gradePoint, gradeLatter } = req.body;
    const insertedGradePoint = await GradeModel.saveGread(
      minNum,
      maxNum,
      gradePoint,
      gradeLatter
    );

    if (insertedGradePoint.errno) {
      res.render("pages/error");
    } else {
      res.render("pages/success");
    }
  },
  /*================= Show Form ================*/
};
//
module.exports = GradeController;
