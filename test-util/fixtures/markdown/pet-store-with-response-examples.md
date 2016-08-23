# Swagger Petstore, version 1.0.0

Base URL: http://petstore.swagger.io/api

- [Endpoints](#endpoints)
  - [GET /pets](#get-pets)
  - [POST /pets](#post-pets)
  - [GET /pets/{id}](#get-petsid)
  - [DELETE /pets/{id}](#delete-petsid) _`deprecated`_
- [Definitions](#definitions)
  - [Pet](#pet)
  - [NewPet](#newpet)
  - [Error](#error)

## Endpoints

### GET /pets

Returns all pets from the system that the user has access to

**Parameters**

| in    | name  | type                                                          | required | description                         | range           | default | unique |
|-------|-------|---------------------------------------------------------------|----------|-------------------------------------|-----------------|---------|--------|
| query | tags  | array, csv of string: clueless, lazy, adventurous, aggressive | false    | tags to filter by                   | `>= 0 && <= 3`  |         | true   |
| query | limit | integer, int32                                                | false    | maximum number of results to return | `> 0 && <= 200` | `20`    |        |

#### Response: 200

pet response

**Schema**

- (array)
  - [Pet](#pet)

#### Response: default

unexpected error

**Schema**

- [Error](#error)

#### Example response

```json
{
  "foo": "bar"
}
```

### POST /pets

Creates a new pet in the store.  Duplicates are allowed

**Parameters**

| in   | name | type              | required | description             |
|------|------|-------------------|----------|-------------------------|
| body | pet  | [NewPet](#newpet) | true     | Pet to add to the store |

#### Response: 200

pet response

**Schema**

- [Pet](#pet)

#### Response: default

unexpected error

**Schema**

- [Error](#error)

#### Example response

```json
{
  "foo": "bar"
}
```

### GET /pets/{id}

Returns a user based on a single ID, if the user does not have access to the pet

**Parameters**

| in   | name | type           | required | description        |
|------|------|----------------|----------|--------------------|
| path | id   | integer, int64 | true     | ID of pet to fetch |

#### Response: 200

pet response

**Schema**

- [Pet](#pet)

#### Response: default

unexpected error

**Schema**

- [Error](#error)

#### Example response

```json
{
  "foo": "bar"
}
```

### DELETE /pets/{id}

> :warning: **deprecated**

deletes a single pet based on the ID supplied

**Parameters**

| in   | name | type           | required | description         |
|------|------|----------------|----------|---------------------|
| path | id   | integer, int64 | true     | ID of pet to delete |

#### Response: 204

pet deleted

**Schema**

N/A

#### Response: default

unexpected error

**Schema**

- [Error](#error)

#### Example response

```json
{
  "foo": "bar"
}
```

## Definitions

### Pet

**Schema**

- (object) All of:
  - [NewPet](#newpet)
  - (object)
    - id (integer: int64)

### NewPet

**Schema**

- (object) A pet
  - name (string) The pet's name
  - tag (string) (optional)

### Error

**Schema**

- (object)
  - code (integer: int32)
  - message (string)
