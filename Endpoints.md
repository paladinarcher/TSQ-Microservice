# Endpoints

## Notes

- if running locally, the port 4000 is exposed for use
- All endpoints are prefixed with `/tsq/`
- Use the header Content-Type, application/json for POST/PUT endpoints

## `/skills/`

### POST

**Route**

```code
/
```

**Example**

```bash
curl -d '{"name":"test-skill-1", "tags": ["python", "framework"]}' -H "Content-Type: application/json" -X POST http://localhost:4000/tsq/skills/
```

**Headers**

|     Headers    |        Value        |
|:--------------:|:-------------------:| 
|  Content-Type  |  application-json   |


**Fields**

| Fields | Required | Description | 
|:------:|:--------:|:-----------:|
| `name` |   true   | string, the name of the skill entry | 
| `tags` |   false   | array of strings, the other tags/skills associated with this skill entry | 


### GET

**Route**

```code
/
```

**Example**

```bash
curl -i -H "Accept: application/json" -X GET http://localhost:4000/tsq/skills/
```

**Query Params**

| Param     | Description                         |
|:---------:|:-----------------------------------:|
|   `?id`   | the `_id` field of the skills entry |
|  `?tags`  | tags, seperated by comma            | 

**Additional Notes**

- When there are no query parameters specified, this will return all the skills entries

### PUT

**Routes**

```code
/updateName/:id
/updateTags/:id
```

**Examples**

```bash
curl  -H "Content-Type: application/json" -d '{ "name": "test-skill-2" }'  -X PUT http://localhost:4000/tsq/skills/updateName/<:id>
curl  -H "Content-Type: application/json" -d '{ "tags":[ "newTag1", "newTag2" ] }'  -X PUT http://localhost:4000/tsq/skills/updateTags/<:id>
```

**Query Params**

`updateTags/:id`

| Param         | Description                                        |
|:-------------:|:--------------------------------------------------:|
|   `?append`   | add tags to the skill, `true` or `false` value     |
|  `?remove`    | tags, seperated by comma, `true` or `false` value  | 

- For `/updateTags/:id` there are `append` and `remove` params
- the system assumes `append` mode if no param is set

### DELETE

**Route**

```code
/removeEntry/:id
```
**Example**

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X DELETE http://localhost:4000/tsq/skills/removeEntry/<:id>
```

## `/skills/users/`

### POST

**Route**

```code
/register
```

**Example**

```bash
# register with no skill data included
curl -H "Content-Type: application/json" -X POST http://localhost:4000/tsq/skills/users/register

# register with skill data included
curl -d '{ "skills": [ {"name": "5cb4c51338156e0017fbbbfe", "familiar":true, "confidenceLevel": 3} ]}' -H "Content-Type: application/json" -X POST http://localhost:4000/tsq/skills/users/register

```

**Fields**


|    Fields     | Description                                  |
|:-------------:|:--------------------------------------------:|
|   `skills`    | an array of skills from the skill collection |

* These contain a `name` (skill ObjectId, required) and `confidenceLevel` (number, optional, defaults to `0`), `familiar` (boolean, defaults to `false`)


### GET

**Routes**

```javascript
/findAll  					            // finds all the entries
/findOne/key/:key 	            // finds one entry by entry key field
/findOne/id/:id 	              // finds one entry by entry _id field
/getDuplicateSkills/key/:key    // gets duplicate skill entries for user by key, returns skill entry id and count
```

**Examples**

```bash
# findall
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4000/tsq/skills/users/findAll/
# findOne by Key
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4000/tsq/skills/users/findOne/key/<key>
# findOne by Id
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4000/tsq/skills/users/findOne/id/<id>
# get Duplicate Skills by Key
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4000/tsq/skills/users/getDuplicateSkills/key/<key>
```

### PUT

**Routes**

```javascript
/addSkills/key/<key>			         // add skills to a user entry
/removeSkills/key/<key>		         // remove skills from a user entry
/updateFamiliarity/key/<key>       // updates users familiar setting for a skill (true/false)
/updateConfidenceInfo/key/<key>    // updates users confidence info for a skill
/removeDuplicateSkills/key/<key>   // removes duplicate skill entries for user by key
```

**Examples**

```bash
# add skills by key example.  Needs an id, and name value in each object in the skills array.  optionally, a familiar value can be added 
curl -X PUT -H "Content-Type: application/json" -d '{"skills":[{"id": "5cb6640253143f001088b060", "name": "JavaScript"}]}' http://localhost:4000/tsq/skills/users/addSkills/key/mq1dKEvioUB0Axiv

# remove skills by key
curl  -H "Content-Type: application/json" -d '{"skills": [{"name": "<skill ObjectID>"}]}'  -X PUT http://localhost:4000/tsq/skills/users/removeSkills/key/d60c6X62iC2Qu1P7

# update familiar
curl  -H "Content-Type: application/json" -d '{"skills": [{"name": "<skill ObjectID>", "familiar": true}]}'  -X PUT http://localhost:4000/tsq/skills/users/updateFamiliarity/key/<key>

# update confidence info
curl  -H "Content-Type: application/json" -d '{"skills": [{"name": "<skill ObjectID>", "confidenceLevel": 3 }]}'  -X PUT http://localhost:4000/tsq/skills/users/updateConfidenceInfo/key/<key>

# remove Duplicate Skills by Key
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4000/tsq/skills/users/removeDuplicateSkills/key/<key>

```

### DELETE

**Routes**

```javascript
/remove/key/<key>	// remove an entry from the db by key field
/remove/id/<id>		// remove an entry from the db by id field
```

**Examples**

```bash
# remove an entry by key
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X DELETE http://localhost:4000/tsq/skills/users/remove/key/<key>
# remove an entry by id
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X DELETE http://localhost:4000/tsq/skills/users/remove/id/<_id>
```
