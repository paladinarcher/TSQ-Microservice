const express = require('express');
const router = express.Router();
const SkillUserData = require('../../models/SkillsUser');

// functions
const errorResponseJson = (response, error) => {
  return response.json({
    success: false,
    message: error,
    data: null
  });
};

const successResponseJson = (response, message, payload) => {
  return response.json({
    success: true,
    message: message,
    data: payload
  });
};

// POST
router.post('/register', (request, response, next) => {
  let userData = new SkillUserData();
  if (request.body.skills) {
    let data = request.body.skills.filter(obj => obj.hasOwnProperty('name'));
    userData.skills = data;
    SkillUserData.registerUserData(userData, (err, data) => {
      if (err) {
        return errorResponseJson(response, err);
      } else {
        const payload = { _id: data._id, key: data.key, skills: data.skills };
        return successResponseJson(
          response,
          'Entry has been created!',
          payload
        );
      }
    });
    // no request body skills param
  } else {
    SkillUserData.registerUserData(userData, (err, data) => {
      if (err) {
        return errorResponseJson(response, err);
      } else {
        const payload = { _id: data._id, key: data.key, skills: data.skills };
        return successResponseJson(
          response,
          'Entry has been created!',
          payload
        );
      }
    });
  }
});

// GET
router.get('/findAll', (request, response, next) => {
  SkillUserData.getAllUserData((error, data) => {
    if (error) {
      return errorResponseJson(response, error);
    } else {
      let payload = { entries: data.length, payload: data };
      return successResponseJson(response, 'Query Successful', payload);
    }
  });
});

router.get('/findOne/id/:id', (request, response, next) => {
  SkillUserData.getUserDataById(request.params.id, (error, data) => {
    if (error) {
      return errorResponseJson(response, error);
    } else {
      let payload = { payload: data };
      return successResponseJson(response, 'Query Successful', payload);
    }
  });
});

router.get('/findOne/key/:key', (request, response, next) => {
  SkillUserData.getUserDataByKey(request.params.key, (error, data) => {
    if (error) {
      return errorResponseJson(response, error);
    } else {
      let payload = { payload: data };
      return successResponseJson(response, 'Query Successful', payload);
    }
  });
});

router.get('/findSkill/key/:key', (request, response, next) => {
  SkillUserData.getUserSkillByKey(
    request.params.key,
    request.query.skill,
    (error, data) => {
      if (error) {
        return errorResponseJson(response, error);
      } else if (data.length === 0) {
        response.status(404);
        let payload = { entries: data.length, payload: null };
        return successResponseJson(response, 'No Skill Match for Key', payload);
      } else {
        let payload = { entries: data.length, payload: data };
        return successResponseJson(response, 'Query Successful', payload);
      }
    }
  );
});

router.get('/getDuplicateSkills/key/:key', (request, response, next) => {
  SkillUserData.getDuplicateSkills(request.params.key, (error, result) => {
    if (error) {
      return errorResponseJson(response, error);
    } else {
      let payload = { payload: { entries: result.length, result: result } };
      return successResponseJson(response, 'Query Sucessful', payload);
    }
  })
})

// PUT
router.put('/addSkills/key/:key', async (request, response, next) => {
  let skills = request.body.skills.filter(obj => obj.hasOwnProperty('name'));
  skills = [...new Set(skills)];
  SkillUserData.getUserDataByKey(request.params.key, (error, data) => {
    if (data !== null) {
      let updatedSkills = data.skills.concat(skills)
      updatedSkills = [...new Set(updatedSkills)]
      SkillUserData.addSkillsByKey(request.params.key, updatedSkills, (error, result) => {
        if (error) {
          return errorResponseJson(response, error);
        } else {
          let payload = { payload: result };
          return successResponseJson(response, 'Update Complete', payload);
        }
      })
    }
  });
});

router.put('/removeSkills/key/:key', (request, response, next) => {
  SkillUserData.removeSkillsByKey(
    request.params.key,
    request.body.skills,
    (error, result) => {
      if (error) {
        return errorResponseJson(response, error);
      } else {
        let payload = { payload: result };
        return successResponseJson(response, 'Update Complete', payload);
      }
    }
  );
});

router.put('/updateFamiliar/key/:key', (request, response, next) => {
  SkillUserData.updateFamiliarityByKey(
    request.params.key,
    request.body.name,
    request.body.familiar,
    (error, result) => {
      if (error) {
        return errorResponseJson(response, error);
      } else {
        let payload = { payload: result };
        return successResponseJson(response, 'Update Complete', payload);
      }
    }
  );
});

router.put('/updateConfidenceInfo/key/:key', (request, response, next) => {
  SkillUserData.updateConfidenceLevelByKey(
    request.params.key,
    request.body.name,
    request.body.confidenceLevel,
    (error, result) => {
      if (error) {
        return errorResponseJson(response, error);
      } else {
        let payload = { payload: result };
        return successResponseJson(response, 'Update Complete', payload);
      }
    }
  );
});

router.put('/removeDuplicateSkills/key/:key', (request, response, next) => {
  SkillUserData.getDuplicateSkills(request.params.key, (error, result) => {
    let skills = result.map(duplicate => { return { name: duplicate._id } })
    SkillUserData.removeSkillsByKey(
      request.params.key,
      skills,
      (error, result) => {
        if (error) {
          return errorResponseJson(response, error);
        } else {
          let payload = { payload: result };
          return successResponseJson(response, 'Update Complete', payload);
        }
      }
    );
  })
})

// DELETE
router.delete('/remove/id/:id', (request, response, next) => {
  SkillUserData.removeSkillDataById(request.params.id, (error, result) => {
    if (error) {
      return errorResponseJson(response, error);
    } else {
      let payload = { payload: result };
      return successResponseJson(response, 'Entry Removed', payload);
    }
  });
});

router.delete('/remove/key/:key', (request, response, next) => {
  SkillUserData.removeSkillDataByKey(request.params.key, (error, result) => {
    if (error) {
      return errorResponseJson(response, error);
    } else {
      let payload = { payload: result };
      return successResponseJson(response, 'Entry Removed', payload);
    }
  });
});

module.exports = router;
