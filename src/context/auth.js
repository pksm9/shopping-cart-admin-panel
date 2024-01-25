import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: "http://155.248.246.152:8080/graphql"
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});

// const errorLink = onError(({graphqlErrors, networkErrors}) => {
//     if(graphqlErrors) {
//       graphqlErrors.map(({message, location, path}) => {
//         alert(`Graphql error ${message}`);
//       });
//     }
//   });
  
//   const link = from([
//     errorLink,
//     new HttpLink({uri: "http://155.248.246.152:8080/graphql"})
//   ]);
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  export default client