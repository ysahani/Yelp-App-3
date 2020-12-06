import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div>
            <Main />
          </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
