# Swagger Petstore, version 1.0.0

Base URL: http://petstore.swagger.io/api

- [Endpoints](#endpoints)
  - [GET /pets](#get-pets)
  - [POST /pets](#post-pets)
  - [GET /pets/{id}](#get-petsid)
  - [DELETE /pets/{id}](#delete-petsid) _`deprecated`_

## Endpoints

### GET /pets

Returns all pets from the system that the user has access to

**Parameters**

| in    | name   | type                                                          | required | description                         | range              | default | unique |
|-------|--------|---------------------------------------------------------------|----------|-------------------------------------|--------------------|---------|--------|
| query | tags   | array, csv of string: clueless, lazy, adventurous, aggressive | false    | tags to filter by                   | `0 <= items <= 3`  |         | true   |
| query | limit  | int32                                                         | false    | maximum number of results to return | `0 < int32 <= 200` | `20`    |        |
| query | offset | int32                                                         | false    | results offset                      | `0 <= int32`       |         |        |

#### Response: 200 OK

pet response

**Schema**

- (array)
  - (object) A pet
    - name (string) The pet's name
    - tag (string) (optional)
    - id (int64)

#### Response: default

unexpected error

**Schema**

- (object)
  - code (int32)
  - message (string)

### POST /pets

Creates a new pet in the store.  Duplicates are allowed

**Parameters**

| in   | name | required | description             |
|------|------|----------|-------------------------|
| body | pet  | true     | Pet to add to the store |

**Request Body**

- (object) A pet
  - name (string) The pet's name
  - tag (string) (optional)

#### Response: 200 OK

pet response

**Schema**

- (object) A pet
  - name (string) The pet's name
  - tag (string) (optional)
  - id (int64)

#### Response: default

unexpected error

**Schema**

- (object)
  - code (int32)
  - message (string)

### GET /pets/{id}

Returns a user based on a single ID, if the user does not have access to the pet

**Parameters**

| in   | name | type  | required | description        |
|------|------|-------|----------|--------------------|
| path | id   | int64 | true     | ID of pet to fetch |

#### Response: 200 OK

pet response

**Schema**

- (object) A pet
  - name (string) The pet's name
  - tag (string) (optional)
  - id (int64)

#### Response: default

unexpected error

**Schema**

- (object)
  - code (int32)
  - message (string)

### DELETE /pets/{id}

> :warning: **deprecated**

deletes a single pet based on the ID supplied

**Parameters**

| in   | name | type  | required | description         |
|------|------|-------|----------|---------------------|
| path | id   | int64 | true     | ID of pet to delete |

#### Response: 204 No Content

pet deleted

**Schema**

N/A

#### Response: default

unexpected error

**Schema**

- (object)
  - code (int32)
  - message (string)
