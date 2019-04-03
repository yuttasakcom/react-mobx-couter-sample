import React from "react";
import { observable, computed, intercept } from "mobx";
import { observer } from "mobx-react";

class AppState {
  @observable count = 0;

  @computed
  get getCount() {
    return this.count;
  }

  inc() {
    this.count++;
  }
}

@observer
class Counter extends React.Component {
  render() {
    const { appState } = this.props;
    return (
      <div>
        <p>counter: {appState.getCount}</p>
        <br />
        <button onClick={() => appState.inc()}>+</button>&nbsp;
        <button onClick={() => (appState.count -= 1)}>-</button>
      </div>
    );
  }
}

const store = new AppState();

intercept(store, "count", change => {
  console.log("new: %s, old: %s", change.newValue, change.object.value);
  return change;
});

const App = () => (
  <div>
    <h2>Index Page</h2>
    <Counter appState={store} />
  </div>
);

export default App;
