# Swagger Petstore, version 1.0.0

Base URL: http://petstore.swagger.io/api

<!-- TOC -->
- [Endpoints](#endpoints)
  - [GET /pets](#get-pets)
  - [POST /pets](#post-pets)
  - [GET /pets/{id}](#get-petsid)
  - [DELETE /pets/{id}](#delete-petsid) _`deprecated`_
- [Definitions](#definitions)
  - [Pet](#pet)
  - [NewPet](#newpet)
  - [Error](#error)

<!-- TOC END -->

## Endpoints

### GET /pets

Returns all pets from the system that the user has access to

**Parameters**

- query: tags (array) - tags to filter by (optional)
- query: limit (integer) - maximum number of results to return (optional)

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

- body: pet (NewPet) - Pet to add to the store

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

- path: id (integer) - ID of pet to fetch

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

- path: id (integer) - ID of pet to delete

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
    - id (integer)

### NewPet

**Schema**

- (object)
  - name (string)
  - tag (string) (optional)

### Error

**Schema**

- (object)
  - code (integer)
  - message (string)
