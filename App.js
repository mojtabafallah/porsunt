import React from 'react';
import {Drawer, Router, Scene} from "react-native-router-flux";
import Login from "./src/components/Login";
import Home from "./src/components/Home";
import Splash from "./src/components/Splash";
import Register from "./src/components/Register";
import vertify from "./src/components/vertify";
import finishreg from "./src/components/finishreg";
import mainbime from "./src/components/mainbime";
import ActionBime from "./src/components/ActionBime";
import SideBar from "./src/components/SideBar";
import NavigationDrawer from "./src/components/NavigationDrawer"

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Drawer
          key='userProfile'
          drawerPosition='left'
          contentComponent={SideBar}
          hideNavBar
          tapToClose
        >
        <Scene key="root" hideNavBar>
          <Scene key="login" component={Login}/>
          <Scene key="home" component={Home}/>
          <Scene key="register" component={Register}/>
          <Scene key="splash" component={Splash} initial/>
          <Scene key="home" component={Home}/>
          <Scene key="vertify" component={vertify}/>
          <Scene key="finishreg" component={finishreg}/>
          <Scene key="mainbime" component={mainbime}/>
          <Scene key="actionbime" component={ActionBime}/>
        </Scene>
        </Drawer>
      </Router>

    )
  }
}
