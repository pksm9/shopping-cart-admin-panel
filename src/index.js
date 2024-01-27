import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider,  createHttpLink} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductView from "./pages/ProductView";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import ProductAdd from "./pages/ProductAdd";


const httpLink = createHttpLink({
  uri: "http://155.248.246.152:8080/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/shopping-cart-admin-panel/",
    element: <App />,
  },
  {
    path: "/shopping-cart-admin-panel/login",
    element: <Login />,
  },
  {
    path: "/shopping-cart-admin-panel/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/shopping-cart-admin-panel/dasboard/add-products",
    element: <ProductAdd />,
  },
  {
    path: '/shopping-cart-admin-panel/dashboard/view-products',
    element: <ProductView />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
