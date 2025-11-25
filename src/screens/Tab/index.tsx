import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Posts from '../Posts';
import styles from './styles';
import Videos from '../Videos';
import Tagged from '../Tagged';
import About from '../About';
import CustomAvatar from '../../components/CustomAvatar';
import { useNavigation } from '@react-navigation/native';

const tabIcons = {
  Post: 'https://cdn-icons-png.flaticon.com/512/3176/3176366.png',
  Videos: 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
  'Tagged Items': 'https://cdn-icons-png.flaticon.com/512/892/892310.png',
  About: 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png',
};

const TabStack = createMaterialTopTabNavigator();

const TabIcon: React.FC<any> = ({ icon, focused, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      <Image
        source={{ uri: icon }}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? '#000' : '#999',
        }}
      />
    </TouchableOpacity>
  );
};

const CustomTopBar = ({ state, navigation, icons }: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: '#ddd',
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;

        return (
          <TabIcon
            key={route.key}
            label={route.name}
            icon={icons[route.name]}
            focused={focused}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </View>
  );
};

const Tab = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.taskInstaConatiner}>
        <Text style={styles.taskInsta}>TaskInsta</Text>
        <CustomAvatar
          size={40}
          source={require('../../assets/images/profile.jpeg')}
          onPress={() => navigation.navigate('Tab', { screen: 'About' })}
        />
      </View>
      <TabStack.Navigator
        tabBarPosition="bottom"
        backBehavior="history"
        screenOptions={{ tabBarShowLabel: false }}
        tabBar={props => <CustomTopBar {...props} icons={tabIcons} />}
      >
        <TabStack.Screen name="Post" component={Posts} />
        <TabStack.Screen name="Videos" component={Videos} />
        <TabStack.Screen name="Tagged Items" component={Tagged} options={{}} />
        <TabStack.Screen name="About" component={About} />
      </TabStack.Navigator>
    </SafeAreaView>
  );
};

export default Tab;
