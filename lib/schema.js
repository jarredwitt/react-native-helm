import Scene from './scene';

const propTypes = {
  ...Scene.propTypes,
};

const defaultProps = {
  type: 'SCHEMA',
  leftButtons: [],
  rightButtons: [],
};

const Schema = () => null;

Schema.propTypes = propTypes;
Schema.defaultProps = defaultProps;

export default Schema;
