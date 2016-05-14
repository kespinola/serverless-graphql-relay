# Serverless Prism

Collection of endpoints used to power a prism app.

- Graphql

## /graphql

### query

### user

```
 user( id: 1){ id, first_name, last_name }
```

### Mutations

#### createLogin

```
{
  "query": "mutation AddUserQuery($input: CreateLoginInput!) { createLogin(input: $input) { token{ value }, clientMutationId }",
  "variables": {
    "input": {
      "email": "ksespinola@gmail.com",
      "password": "letmein123",
      "clientMutationId": "test_123"
    }
  }
}
```
