import React, { Component, PropTypes } from 'react';
import { Animated, Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');


class Modal extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    direction: PropTypes.string,
    frozen: PropTypes.bool,
    show: PropTypes.bool,
  };

  static defaultProps = {
    backgroundColor: '#FFFFFF',
    direction: 'vertical',
  };

  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(height),
      children: props.children,
      direction: props.direction,
      show: props.show,
    };
  }
  componentWillMount() {
    let animatedValue = this.state.direction === 'vertical' ? height : width;
    let _animatedValue = this.props.show ? 0 : animatedValue;

    Animated.spring(
      this.state.animatedValue,
      {
        toValue: _animatedValue,
        duration: 400,
      },
    ).start();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      children: nextProps.children || this.state.children,
      direction: nextProps.children === undefined ? this.state.direction : nextProps.direction,
      show: nextProps.show,
    });
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.show !== this.state.show || !this.props.frozen) {
      return true;
    }

    return false;
  }
  componentDidUpdate() {
    let animatedValue = this.state.direction === 'vertical' ? height : width;
    let _animatedValue = this.props.show ? 0 : animatedValue;

    Animated.timing(
      this.state.animatedValue,
      {
        toValue: _animatedValue,
        duration: 400,
      },
    ).start(() => {
      if (!this.state.show && this.state.children) {
        this.setState({
          children: null,
        });
        this.forceUpdate();
      }
    });
  }
  render() {
    let top = 0;
    let left = 0;
    if (this.state.direction === 'vertical') {
      top = this.state.animatedValue;
    } else {
      left = this.state.animatedValue;
    }

    // Doing this to keep from covering up the right drawer menu once a horizontal modal is shown.
    let displayWidth = this.state.children ? width : 0;

    return (
      <Animated.View style={[{ position: 'absolute', top, left, overflow: 'hidden', height, width: displayWidth, backgroundColor: this.props.backgroundColor }]}>
        {this.state.children}
      </Animated.View>
    );
  }
}

export default Modal;
