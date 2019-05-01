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
curl -d '{"name":"django", "tags": ["python", "framework"]}' -H "Content-Type: application/json" -X POST http://localhost:4000/tsq/skills/
```

**Additional Notes**

- Use Content-Type of application json
- Required Fields: `name`
- Optional Fields: `tags`, `keys`

`name`: string, the name of the skill entry
`tags`: array of strings, the other tags/skills associated with this skill entry
`keys`: user keys that this skill are registered to (this functionality isn't implemented yet)

### GET

**Route**

```code
/
```

**Example**

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4000/tsq/skills/?id=5c7d61a16813350016de866e
```

**Query Params**

- `?id` -- the id field of the skills entry
- `?tags` -- entries inside the tags array. You can search for an entry with multiple
  tags by seperating the tags with a comma and entries that have ALL the tags specified will show in the results

**Additional Notes**

- When there are no query parameters specified, this will return all the skills entries

### PUT

**Routes**

```code
/updateName/<id>
```

```code
/updateTags/<id>
```

**Examples**

```bash
curl  -H "Content-Type: application/json" -d '{"name":"newValue"}'  -X PUT http://localhost:4000/tsq/skills/updateName/5c7d61a16813350016de866e
curl  -H "Content-Type: application/json" -d '{"tags":["newTag1", "newTag2"]}'  -X PUT http://localhost:4000/tsq/skills/updateTags/5c7d61a16813350016de866e?append=true
```

**Query Params**

- For `/updateName/<id>` there are no query params
- For `/updateTags/<id>` there are `append` and `remove` params
- to add tags to the list, use `?append=true`
- to remove tags, use `?remove=true`
- the system assumes append if no param is set

### DELETE

**Route**

```code
/removeEntry/<id>
```

**Example**

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X DELETE http://localhost:4000/tsq/skills/removeEntry/5c7d61a16813350016de866e
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
curl -H "Content-Type: application/json" POST http://localhost:4000/tsq/skills/users/register

# register with skill data included
curl -d '{ "skills": [ {"name": "5cb4c51338156e0017fbbbfe", "familiar":true, "confidenceLevel": 3} ]}' -H "Content-Type: application/json" -X POST http://localhost:4000/tsq/skills/users/register

```

**Fields**

`skills`: skills is an array of skills to attach to the user
These contain a `name` (skill ObjectId, required) and `confidenceLevel` (number, optional, defaults to `0`), `familiar` (boolean, defaults to `false`)

### GET

**Routes**

```javascript
/findAll  					           // finds all the entries
/findOne/key/<key> 	           // finds one entry by entry key field
/findOne/id/<id>  	           // finds one entry by entry _id field
/getDuplicateSkills/key/<key>  // gets duplicate skill entries for user by key, returns skill entry id and count
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
# add skills by key
curl  -H "Content-Type: application/json" -d '{"skills": [{"name": "<skill ObjectID>"}]}'  -X PUT http://localhost:4000/tsq/skills/users/addSkills/key/<key>

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
