import React from 'react'
import { Text, View } from 'react-native'
import SettingsItem from './settingsItem'
import type { SettingsSection } from '@interfaces'
import { styles } from './SettingsGroup.styles'

type SettingsGroupProps = {
  section: SettingsSection
}

export default function SettingsGroup({ section }: SettingsGroupProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        {section.items.map((settingItem, index) => (
          <SettingsItem key={index} item={settingItem} />
        ))}
      </View>
      {section.description && <Text style={styles.description}>{section.description}</Text>}
    </View>
  )
}
