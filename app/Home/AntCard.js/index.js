import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  ScaledSheet
} from 'react-native-size-matters'


function AntCard(props) {
  const { name, length, color, weight, winLikelihood} = props.ant
  const { checkMarkStyle, onPress } = props
  const { container, descriptionStyles, nameStyle, winLikelihoodStyle } = styles 
  
  // console.log(winLikelihood)

  return (
    <TouchableOpacity activeOpacity={.5} onPress={() => onPress(props.ant)}>
      <View style={container}>
        <View style={{flex: 1}}>
          <Text style={nameStyle}>{name}</Text>
          <View style={{
            flexDirection: 'row',
          }}>
            <Text style={descriptionStyles}>{length / 10} cm,</Text>
            <Text style={descriptionStyles}>{weight} mg,</Text>
            <Text style={descriptionStyles}>{color}</Text>
          </View>

          <View>
            <Text style={winLikelihoodStyle}>Win likelihood: <Text style={descriptionStyles}>{ winLikelihood } %</Text></Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkBox}>
          <View style={[styles.checkmark, checkMarkStyle]} />
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    borderBottomWidth: '3@ms',
    borderRightWidth: '2@ms',
    borderWidth: '1@ms',
    margin: '5@ms',
    padding: '2@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  descriptionStyles: {
    marginRight: '5@ms',
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },
  nameStyle: {
    fontSize: '18@ms',
    fontFamily: 'TimesNewRomanPS-BoldItalicMT',
    flex: 1,
    marginRight: '10@ms',
  },
  winLikelihoodStyle: {
    fontSize: '18@ms',
    fontFamily: 'American Typewriter',
    flex: 1,
  },
  checkBox: {
    alignSelf: 'flex-end',
    borderWidth: '1@ms',
    width: '25@ms',
    height: '25@ms',
    justifyContent: 'center',
  },
  checkmark: {
    width: '20@ms',
    height: '20@ms',
    backgroundColor: '#000',
    alignSelf: 'center',
  },
})

export default AntCard