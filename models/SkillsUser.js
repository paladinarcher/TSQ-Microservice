const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rand = require('random-key');
const SkillData = require('./Skills');

const skillsData = {
  name: {
    type: Schema.Types.ObjectId,
    ref: 'Skills'
  },
  familiar: {
    type: Boolean,
    default: false,
    required: true
  },
  confidenceLevel: {
    type: Number,
    default: 0,
    required: true
  }
};

const SkillsUserSchema = mongoose.Schema({
  key: {
    type: String,
    default: () => rand.generate(),
    required: true
  },
  skills: {
    type: [skillsData],
    default: [],
    required: true
  }
});

const SkillUserData = (module.exports = mongoose.model(
  'Keys',
  SkillsUserSchema
));
module.exports.registerUserData = function (userData, callback) {
  userData.save(callback);
};

module.exports.getAllUserData = function (callback) {
  SkillUserData.find({}, callback);
};

module.exports.getUserDataById = function (id, callback) {
  let query = { _id: id };
  SkillUserData.findOne(query, callback);
};

module.exports.getUserDataByKey = function (key, callback) {
  let query = { key: key };
  SkillUserData.findOne(query)
    .populate('skills.name')
    .exec(callback);
};

module.exports.getUserSkillByKey = function (key, skill, callback) {
  console.log(skill);
  let query = {
    key: key,
    'skills.name': mongoose.Types.ObjectId(skill)
  };
  SkillUserData.find(query, callback);
};

module.exports.getDuplicateSkills = function (key, callback) {
  SkillUserData.aggregate([
    { $match: { key: key } },
    { $unwind: "$skills" },
    { $sort: { "skills.name": 1 } },
    { $group: { _id: "$skills.name", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $match: { count: { "$gt": 1 } } }
  ], callback)
}

module.exports.checkForDuplicateSkills = function (key, objectId, callback) {
  SkillUserData.aggregate([
    { $match: { key: key } },
    { $unwind: "$skills" },
    { $match: { "skills.name": objectId } },
  ], callback)
}

module.exports.addSkillsByKey = async function (key, skills, callback) {
  
  async function verifySkills (skills) {
    let newSkillsArray = []
    for (skill of skills) {
      const verifiedSkill = await SkillData.findOne({name: skill.name}, (error, result) => {
        if (!error) return result
      })

      if (!skill.familiar || skill.familiar === undefined)
      skill.familiar = false;
      if (!skill.confidenceLevel || skill.confidenceLevel === undefined)
        skill.confidenceLevel = 0;

      newSkillsArray.push({ 
        name: verifiedSkill.name,
        _id: verifiedSkill._id,
        confidenceLevel: skill.confidenceLevel,
        familiar: skill.familiar
      })
    }
    return newSkillsArray;  
  }

  async function getUserkeyData(query) {
    const keyData = await SkillUserData.findOne(query, (error, result) => {
      if (error) return error 
      else return result
    })
    return keyData;
  }

  async function runSkillUpdate(query, updateArray) {
    const update = await SkillUserData.findOneAndUpdate(query, { $set: { skills: updateArray }, }, { useFindAndModify: false }, (err, doc, res) => {
      return doc;
    })
    return update;
  }

  function removeDuplicateSkills (skillsArray) {
    return skillsArray.filter((skill, index, skillsArray) => {
      if (skill.name.toString() === skill._id.toString()) return false;
      return skillsArray.map(skill => skill._id).indexOf(skill._id) === index;
    });
  }

  if (skills.length < 1) return callback(null, { updatedStatus: null, key, skills });
  
  const query = { key: key }
  const keyData = await getUserkeyData(query)
  const verifiedSkills = await verifySkills(skills);
  const currentSkills = keyData.toObject().skills;
  const verifiedSkillsWithoutDuplicates = removeDuplicateSkills(currentSkills.concat(verifiedSkills))

  const updateArray = verifiedSkillsWithoutDuplicates.map(skill => {
    if (!skill.confidenceLevel) skill.confidenceLevel = 0;
    if (!skill.familiar) skill.familiar = false;
    
    return {
      _id: skill._id,
      name: skill._id,
      confidenceLevel: skill.confidenceLevel,
      familiar: skill.familiar
    }
  })
  
  const updatedStatus = await runSkillUpdate(query, updateArray);

  callback(null, {
    doc: updatedStatus._doc,
  })

}


module.exports.removeSkillsByKey = function (key, data, callback) {
  let query = { key: key };
  let skillNames = data.map(item => {
    return item.name;
  });
  let updateQuery = { $pull: { skills: { name: { $in: skillNames } } } };
  SkillUserData.update(query, updateQuery, { multi: true }, callback);
};

module.exports.removeSkillDataByKey = function (key, callback) {
  const query = { key: key };
  SkillUserData.deleteOne(query, callback);
};

module.exports.removeSkillDataById = function (id, callback) {
  const query = { _id: id };
  SkillUserData.deleteOne(query, callback);
};

module.exports.updateFamiliarityByKey = function (
  key,
  skill,
  familiar,
  callback
) {
  console.log(skill);
  const query = { key: key };
  SkillUserData.updateOne(
    query,
    { $set: { 'skills.$[skillObject].familiar': familiar } },
    { arrayFilters: [{ 'skillObject.name': { $eq: skill } }] },
    callback
  );
};

module.exports.updateConfidenceLevelByKey = function (
  key,
  skill,
  confidenceLevel,
  callback
) {
  console.log(skill);
  const query = { key: key };
  SkillUserData.updateOne(
    query,
    { $set: { 'skills.$[skillObject].confidenceLevel': confidenceLevel } },
    { arrayFilters: [{ 'skillObject.name': { $eq: skill } }] },
    callback
  );
};