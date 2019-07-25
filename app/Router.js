import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import SignIn from './SignIn';
import Home from './Home';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar initial>
          <Scene key="home" component={Home} hideNavBar />
          <Scene key="signin" component={SignIn} hideNavBar /> 
      </Stack>
    </Router>
  )
}

export default RouterComponent