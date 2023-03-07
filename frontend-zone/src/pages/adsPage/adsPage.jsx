import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const NewWindowComponent = class extends React.Component {
  state = {
    data: null
  };
  
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get('/api/data', { params: { id } })
      .then(response => {
        const data = response.data;
        this.setState({ data });
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  render() {
    return (
      <div>
        {this.state.data ? (
          // Render the data
          <h1>asdasdsa</h1>
        ) : (
        //   Render a loading indicator
        <h1>asdasdsa</h1>
        )}
      </div>
    );
  }
};

const AdsPage = () => {
  const handleClick = () => {
    const id1 = uuidv4();
    const newWindow1 = window.open('', '_blank');
    newWindow1.location.href = `/new-window?id=${id1}`;
    
    const id2 = uuidv4();
    const newWindow2 = window.open('', '_blank');
    newWindow2.location.href = `/new-window?id=${id2}`;
  };
  
  return (
    <div>
      <button onClick={handleClick}>Open new tabs</button>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <Route exact path="/" component={AdsPage} />
    <Route path="/new-window" component={NewWindowComponent} />
  </Router>,
  document.getElementById('root')
);
