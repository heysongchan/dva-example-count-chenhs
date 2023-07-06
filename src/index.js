import React, { Component } from 'react';
import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import './style.css';

const mapStateToProps = (state, ownProps) => {
  const { mymodel } = state;
  const { count } = mymodel;
  return { count };
};

class MyComp extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps = (nextProps) => {
    console.log(this.props);
    console.log(nextProps);
  }
  render = () => {
    const { dispatch, count } = this.props;
    return (
      <div>
        <h2 style={{ "marginLeft": "30px" }}>{count}</h2>
        <button style={{ "width": "40px" }}
          key="add"
          onClick={() => {
            dispatch({ type: 'mymodel/add', payload: { b: 2 } });//dispatch payload to reduce
          }}
        >
          +
        </button>
        <button style={{ "marginLeft": "20px", "width": "40px" }}
          key="minus"
          onClick={() => {
            dispatch({ type: 'mymodel/minus', payload: { a: 1 } });//dispatch payload to reduce
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
  namespace: 'mymodel',
  state: { count: 0 },
  reducers: {
    add(mymodel, { payload }) {
      const { b } = payload;//from add dispatch
      const { count, ...other } = mymodel;
      return { "count": (count + b), ...other };
    },
    minus(mymodel, { payload }) {
      const { a } = payload;//from minus dispatch
      const { count, ...other } = mymodel;
      return { "count": (count - a), ...other };
    },
  },
});

// 3. View
const App = connect(mapStateToProps)(MyComp);

// 4. Router
// app.router(
//   ({ history }) => {
//     return (<App />);
//   }
// );
app.router(({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
});

// 5. Start
app.start('#root');
