import React from 'react';
//import React from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './SideBar';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

export default class NavigationDrawer extends React.Component {
  render(){
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={()=>Actions.refresh({key:state.key, open: true})}
        onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="displace"
        content={<SideMenu />}
        tapToClose={true}
        negotiatePan={true}
        >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
