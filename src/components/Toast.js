import React from 'react';
import { ToastAndroid } from 'react-native';

export const showToast = toastText => {
  ToastAndroid.showWithGravityAndOffset(
    toastText,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

class Toast extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    return null;
  }
}

export { Toast };
