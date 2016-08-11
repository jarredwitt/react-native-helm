import { PropTypes } from 'react';
import { Text } from 'react-native';

const propTypes = {
  direction: PropTypes.string,
  hideNavBar: PropTypes.bool,
  schema: PropTypes.string,
  renderBackButton: PropTypes.func,
  leftButtons: PropTypes.array,
  rightButtons: PropTypes.array,
  renderTitle: PropTypes.func,
  titleStyle: Text.propTypes.style,
  type: PropTypes.string,
};

const defaultProps = {
  direction: 'vertical',
  hideNavBar: false,
  leftButtons: [],
  rightButtons: [],
  type: 'SCENE',
};

const Scene = () => null;

Scene.propTypes = propTypes;
Scene.defaultProps = defaultProps;

export default Scene;
