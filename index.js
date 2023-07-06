import React, { Component } from 'react';
import dva, { connect } from 'dva';
import './style.css';

const mapStateToProps = (state, ownProps) => {
  const { count } = state;
  return { count };
};

class MyComp extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    const { dispatch, count } = this.props;
    return (
      <div>
        <h2>{count}</h2>
        <button
          key="add"
          onClick={() => {
            dispatch({ type: 'count/add' });
          }}
        >
          +
        </button>
        <button
          key="minus"
          onClick={() => {
            dispatch({ type: 'count/minus' });
          }}
        >
          -
        </button>
      </div>
    );
  };
}

// 1. Initialize
const app = dva();

// 2. Model
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add(count) {
      return count + 1;
    },
    minus(count) {
      return count - 1;
    },
  },
});

// 3. View
const App = connect(mapStateToProps)(MyComp);

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#root');
