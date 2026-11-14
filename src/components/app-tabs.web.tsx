import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';

import {
  Pressable,
  View,
  StyleSheet,
} from 'react-native';

import {
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

// Main App Tabs
export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />

      <TabList asChild>
        <CustomTabList>

          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>

          <TabTrigger name="categories" href="/categories" asChild>
            <TabButton>Categories</TabButton>
          </TabTrigger>

          <TabTrigger name="applications" href="/applications" asChild>
            <TabButton>Applications</TabButton>
          </TabTrigger>

          <TabTrigger name="favourites" href="/favourites" asChild>
            <TabButton>Favourites</TabButton>
          </TabTrigger>

          <TabTrigger name="checklist" href="/checklist" asChild>
            <TabButton>Checklist</TabButton>
          </TabTrigger>

        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

// Individual Tab Button
export function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {
  return (
    <Pressable
      {...(props as any)}
      style={({ pressed }) =>
        pressed ? styles.pressed : undefined
      }
    >
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}
      >
        <ThemedText
          type="small"
          themeColor={isFocused ? 'text' : 'textSecondary'}
        >
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

// Custom Tab List
export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView
        type="backgroundElement"
        style={styles.innerContainer}
      >
        <ThemedText
          type="smallBold"
          style={styles.brandText}
        >
          GovGuide LK
        </ThemedText>

        {props.children}
      </ThemedView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },

  brandText: {
    marginRight: 'auto',
  },

  pressed: {
    opacity: 0.7,
  },

  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});