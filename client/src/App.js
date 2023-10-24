// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from '../src/pages/Home'
import Nav from '../src/components/Nav/index'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <WorkoutTracker> */}
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              {/* <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/progress" 
                element={<Progress />} 
              />
              <Route 
                path="/workouts" 
                element={<Workouts />} 
              />
              <Route 
                path="/selectedworkout" 
                element={<Selectedworkout />} 
              />
              <Route 
                path="/settings" 
                element={<Settings />} 
              /> */}


            </Routes>
          {/* </WorkoutTracker> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;