import { PropTypes } from 'react';
import { Text, View } from 'react-native';

const propTypes = {
  direction: PropTypes.string,
  headerContainerStyle: View.propTypes.style,
  headerStyle: View.propTypes.style,
  headerTitleStyle: Text.propTypes.style,
  hideNavBar: PropTypes.bool,
  leftButtons: PropTypes.array,
  schema: PropTypes.string,
  renderBackButton: PropTypes.func,
  rightButtons: PropTypes.array,
  renderTitle: PropTypes.func,
  type: PropTypes.string,
};

const defaultProps = {
  direction: 'vertical',
  hideNavBar: false,
  type: 'SCENE',
};

const Scene = () => null;

Scene.propTypes = propTypes;
Scene.defaultProps = defaultProps;

export default Scene;
