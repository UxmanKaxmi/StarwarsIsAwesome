import React from 'react';
import { Text as TextRN, StyleSheet } from 'react-native';
import { DEFAULT_TEXT_COLOR } from '../config/colors';

class Text extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextRN style={[styles.defaultStyle, this.props.style]}>
        {this.props.children}
      </TextRN>
    );
  }
}
const styles = StyleSheet.create({
  // ... add your default style here
  defaultStyle: {
    fontFamily: 'montserrat-regular',
  },
});
export { Text };

