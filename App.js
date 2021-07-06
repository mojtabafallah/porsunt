import React from 'react';
import {Drawer, Router, Scene, Stack} from "react-native-router-flux";
import Login from "./src/components/Login";
import Home from "./src/components/Home";
import Splash from "./src/components/Splash";
import Register from "./src/components/Register";
import vertify from "./src/components/vertify";
import finishreg from "./src/components/finishreg";
import mainbime from "./src/components/mainbime";
import ActionBime from "./src/components/ActionBime";
import SideBar from "./src/components/SideBar";
import Reports from "./src/components/Reports";
import NavigationDrawer from "./src/components/NavigationDrawer"

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" hideNavBar initial={true} component={Login}/>
          <Scene key="splash" hideNavBar component={Splash} initial/>
          <Scene key="register" hideNavBar component={Register}/>
          <Drawer
            key='drawer'
            drawerPosition='left'
            contentComponent={SideBar}
            hideNavBar
            tapToClose
          >
            <Scene key="home" hideNavBar component={Home}/>
            <Scene key="vertify" hideNavBar component={vertify}/>
            <Scene key="finishreg" hideNavBar component={finishreg}/>
            <Scene key="mainbime" hideNavBar component={mainbime}/>
            <Scene key="reports" hideNavBar component={Reports}/>
            <Scene key="actionbime" hideNavBar component={ActionBime}/>
          </Drawer>
        </Stack>
      </Router>

    )
  }
}
