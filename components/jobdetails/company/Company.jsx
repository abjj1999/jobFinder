import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './company.style'
import { icons } from '../../../constants'
import { checkImage } from '../../../utils'
const Company = ({
  companyLogo,
  companyName,
  jobTitle,
  location,
}) => {
  return (
    <View
      style={styles.container}
    >
      <View 
        style={styles.logoBox}
      >
        <Image
          source={{
            uri: checkImage(companyLogo)? companyLogo : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </View>
      <View
        style={styles.jobTitleBox}
      >
        <Text
          style={styles.jobTitle}
          numberOfLines={1}
        >
          {jobTitle}
        </Text>
      </View>
      <View
        style={styles.companyInfoBox}
      >
        <Text
          style={styles.companyName}
        >
          {companyName} /
        </Text>
        <View
          style={styles.locationBox}
        >
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text 
            style={styles.location}
            >
            {location}
            </Text>
        </View>
        </View>
    </View>
  )
}

export default Company