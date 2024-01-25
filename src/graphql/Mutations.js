import {gql} from '@apollo/client'

export const USER_DATA = gql`
mutation Mutation($email: String!, $password: String!) {
  SignIn(email: $email, password: $password) {
    validTill
    accessToken
  }
}
`;