import type { SettingsSection } from '@interfaces'
import { Text, View } from 'react-native'
import { styles } from './SettingsGroup.styles'
import SettingsItem from './settingsItem'

type SettingsGroupProps = {
  section: SettingsSection
}

export default function SettingsGroup({ section }: SettingsGroupProps) {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        {section.items.map((settingItem) => (
          <SettingsItem key={`${section.id}-${settingItem.label}`} item={settingItem} />
        ))}
      </View>
      {section.description && <Text style={styles.description}>{section.description}</Text>}
    </View>
  )
}
