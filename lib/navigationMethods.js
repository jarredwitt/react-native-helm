import * as actions from './constants';

export default (dispatcher) => ({
  pop: (props) => dispatcher({ type: actions.POP, props }),
  push: (key, props) => dispatcher({ type: actions.PUSH, key, props }),
});
