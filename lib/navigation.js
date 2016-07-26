import { PropTypes } from 'react';
import { Text } from 'react-native';

const propTypes = {
  direction: PropTypes.string,
  hideNavBar: PropTypes.bool,
  schema: PropTypes.string,
  renderBackButton: PropTypes.func,
  renderLeftButton: PropTypes.func,
  renderRightButton: PropTypes.func,
  renderTitle: PropTypes.func,
  titleStyle: Text.propTypes.style,
  type: PropTypes.string,
};

const defaultProps = {
  direction: 'vertical',
  hideNavBar: false,
  type: 'SCENE',
};

const Navigation = () => null;

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
