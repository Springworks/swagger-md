### GET /pets/{id}

Returns a user based on a single ID, if the user does not have access to the pet

**Parameters**

- path: id (integer) - ID of pet to fetch

#### Response: 200

pet response

**Schema**

- (Pet)

#### Response: default

unexpected error

**Schema**

- (Error)

### DELETE /pets/{id}

deletes a single pet based on the ID supplied

**Parameters**

- path: id (integer)

#### Response: 204

pet deleted

**Schema**

N/A

#### Response: default

unexpected error

**Schema**

- (Error)
