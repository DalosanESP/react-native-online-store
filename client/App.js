import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './Navigation'
import Login from './src/screens/Login'

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  })

  if(isFirstLaunch === null) {
    return null
  } else if(isFirstLaunch === true) {
    return (<Login />);
  } else {
    return (<Navigation />);
  }
}