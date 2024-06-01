import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text} from 'react-native';
import Login from './app/screens/Login';
import FaceAnalysis from './app/screens/FaceAnalysis';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeLayout() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={FaceAnalysis} options={{ headerShown: false}}/>
    </HomeStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const auth = FIREBASE_AUTH;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user)
      setUser(user);
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Home' component={FaceAnalysis} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);

