import {gql} from '@apollo/client'

export const LOGIN_MUTATION = gql`
mutation Mutation($email: String!, $password: String!) {
  SignIn(email: $email, password: $password) {
    validTill
    accessToken
  }
}
`;