### POST /pets

Creates a new pet

**Parameters**

| in   | name | required | description        |
|------|------|----------|--------------------|
| body | body | true     | Params for new pet |

**Request Body**

- (object)
  - name (string)

#### Response: 201

pet response

**Schema**

- [Pet](#pet)

#### Response: default

unexpected error

**Schema**

- [Error](#error)
