import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
// import { Actions } from 'react-native-router-flux';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottonRow: props.bottomRow,
    }
  }

  renderBottomRow() {
    const { secondRow } = this.props;
    if (this.props.bottomRow) {
      return (
        <View style={styles.bottomView}>
          {secondRow}
        </View>
      );
    }
  }

  renderBackBtn() {
    if (this.props.backBtn) {
      return (
        <TouchableOpacity onPress={() => Actions.pop()}>
          <View style={styles.btnViewStyle}>
            <Text>Back</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderRightBtn() {
    const { optionView, optionText } = styles
    const {rightBtn, optionPress} = this.props

    if (rightBtn) {
      return (
        <TouchableOpacity style={optionView} onPress={optionPress}>
          <Text style={optionText}>{rightBtn}</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const {
      titleStyle, titleView,
      container, top 
    } = styles;
    const { title } = this.props;

    return (
      <View style={container}>

        <View style={top}>

          {this.renderBackBtn()}

          <View style={titleView}>
            <Text style={titleStyle}>{title}</Text>
          </View>

          {this.renderRightBtn()}

        </View>


        {this.renderBottomRow()}

      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowOffset: {width: 3, height: 3},
    shadowColor: '#393939',
    shadowOpacity: .3,
    marginBottom: '4@vs',
    justifyContent: 'center',
    paddingTop: '10@ms',
  },
  top: {
    flexDirection: 'row',
    minHeight: '40@ms',
  },
  titleView: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  titleStyle: {
    fontSize: '26@ms',
    color: 'dimgrey',
    alignSelf: 'center',
    textAlign: 'center'
  },
  optionText: {
    fontSize: '22@ms',
    color: 'dimgrey',
    alignSelf: 'flex-end',
    margin: '5@ms',
  },
  optionView: {
    marginRight: '10@s',
    alignSelf: 'flex-end',
    margin: '5@ms',
  },
  bottomView: {
    marginBottom: '5@ms',
    height: '40@ms',
  },
  backBtnStyle: {
    width: '44@ms',
    height: '44@ms',
    padding: '10@ms',
    alignSelf: 'flex-start',
    marginBottom: '9@ms',
  },
  btnViewStyle: {
    alignSelf: 'flex-start',
    width: '44@ms',
    height: '44@ms',
  },
})

export { NavBar };
