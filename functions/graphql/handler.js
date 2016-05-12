import runGraphQL from './../../lib/services/graphql';

export default ({ query, variables }) => runGraphQL(query, variables);

/*
// create user
 {
 "query": "{ createUser (email: \"ksespinola@gmail.com\", password: \"test\"){ id email token } }"
 }
 // get users
 {
 "query": "{ users {id name email token} }"
 }
 // get user
 {
 "query": "{ user (id: \"2\") {id first_name last_name } }"
 }
 // login
 {
 "query": "{ loginUser (email: \"john.doe@gmail.com\", password: \"letmein123\"){ email token id  } }"
 }
 // update user
 {
 "query": "{ updateUser (name: \"Fake Name\", email: \"eahefnawy@gmail.com\", password: \"secret\", token: \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVhaGVmbmF3eSIsImlkIjoiYzU1YTg2NTAtZjk4Yy0xMWU1LWI0ZGQtZWJlMTMzYmNkNDJjIiwiZW1haWwiOiJlc2xhbUBzZXJ2ZXJsZXNzLmNvbSIsIm5hbWUiOiJFc2xhbSBBLiBIZWZuYXd5IiwicGVybWlzc2lvbnMiOlsiVVBEQVRFX1VTRVIiLCJERUxFVEVfVVNFUiJdLCJpYXQiOjE0NTk2ODIyNzJ9.NdS8e6FAa06qqETad4EL0A4Z816DIQbd2Ya7Z2e9zwA\"){id username name email token}}"
 }
 // delete user
 {
 "query": "{ deleteUser (token: \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVhaGVmbmF3eSIsImlkIjoiYzU1YTg2NTAtZjk4Yy0xMWU1LWI0ZGQtZWJlMTMzYmNkNDJjIiwiZW1haWwiOiJlc2xhbUBzZXJ2ZXJsZXNzLmNvbSIsIm5hbWUiOiJFc2xhbSBBLiBIZWZuYXd5IiwicGVybWlzc2lvbnMiOlsiVVBEQVRFX1VTRVIiLCJERUxFVEVfVVNFUiJdLCJpYXQiOjE0NTk2ODIyNzJ9.NdS8e6FAa06qqETad4EL0A4Z816DIQbd2Ya7Z2e9zwA\"){id username name email token}}"
 }
*/
