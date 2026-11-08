import { Color, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout(){
    return(
        <Tabs screenOptions = {{
            tabBarActiveTintColor : '#1e6fd9'
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title:'Home',
                    tabBarIcon: ({ color, size }) => 
                        <Ionicons name="home" size={size} color={color as string} />
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: 'Categories',
                    tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color as string} />
                }}
            />
            <Tabs.Screen
                name="favourites"
                options={{
                    title: 'Favourites',
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color as string} />
                }}
            />
            <Tabs.Screen
                name="checklist"
                options={{
                    title: 'Checklist',
                    tabBarIcon: ({ color, size }) => <Ionicons name="checkbox" size={size} color={color as string} />
                }}
            />
        </Tabs>
    );
}