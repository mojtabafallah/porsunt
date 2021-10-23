import React, {Component} from 'react';
import { Image, View, StyleSheet, AsyncStorage, ScrollView } from "react-native";
import {Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body} from 'native-base';
import {Actions} from "react-native-router-flux";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

const styles = StyleSheet.create({
  collapseHeader: {
    width: '90%',
    marginBottom: 5,
    marginTop: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 10,
    // height: 50,
    borderRadius: 7,
    // boxShadow: '0px 0px 1px 5px gray',
    backgroundColor: 'white'
  },
  alertBox: {
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: 'white',
    color: '#81a0bb',
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 15,
    paddingRight: 10,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  otherStyle: {
    position: 'absolute',
    justifyContent: 'center',
  }
});

export default class Reports extends Component {



    constructor(props) {
        super();

        this.state = {
             reports: '',

        }
    }

  componentDidMount() {
    this.fetchUserReport()
  }

  async fetchUserReport() {

    const code_melli = await AsyncStorage.getItem('code_melli');
    const password = await AsyncStorage.getItem('password');

    try {
      let response = await fetch(`https://porsunt.com/api/getreport?code_melli=${code_melli}&password=${password}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })

      let json = await response.json();

      console.log('json =>',json)

      this.setState({
        reports: json
      })
    } catch (error) {
      console.log(error);
    }

  }


  render() {
        return (
          <>
             <Header>
                <Left>
                    <Button
                      transparent
                      onPress={() => {
                          Actions.drawerOpen()
                      }}
                    >
                        <Icon ios='ios-menu' android="md-menu" />
                    </Button>
                </Left>
                <Right>
                    <Text style={{color: 'white'}}>
                        گزارشات
                    </Text>
                </Right>
            </Header>
            <View style={{marginTop: 30}}>


              {  this.state.reports.length === 0 ? (
                <Text style={styles.alertBox}>
                گزارشی جهت نمایش وجود ندارد
                </Text>
              ):(
                <Text style={styles.alertBox}>
                  با ضربه روی سفارش موردنظر میتوانید از جزئیات آن اطلاع پیدا کنید.
                </Text>
              )}
              {
                this.state.reports.length !== 0 && this.state.reports.map(report => {
                  return (
                    <>

                        <Collapse style={styles.collapseHeader}>
                          <CollapseHeader>
                            <View style={styles.headerContainer}>
                              <Text>{report.date}</Text>
                              <Text> نام بیمه: {report.nam_bime} </Text>
                            </View>
                          </CollapseHeader>
                          <CollapseBody>
                            <View
                              style={{
                                marginBottom: 10,
                                marginTop: 10,
                                borderBottomColor: '#cccaca',
                                borderBottomWidth: 1,
                              }}
                            />
                            <View style={styles.rowContainer}>
                              <Text>کد بیمه:</Text>
                              <Text>{report.code_intro}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                              <Text>ماه:</Text>
                              <Text>{report.month}ام</Text>
                            </View>
                            <View style={styles.rowContainer}>
                              <Text>تاریخ صدور</Text>
                              <Text>{report.date}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                              <Text>نام</Text>
                              <Text>{report.name}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                              <Text>نام خانوادگی</Text>
                              <Text>{report.family}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                              <Text>کدملی</Text>
                              <Text>{report.code_melli}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                              <Text>شماره همراه</Text>
                              <Text>{report.mobile}</Text>
                            </View>
                          </CollapseBody>
                        </Collapse>

                    </>
                  )
                })
              }

            </View>
          </>
        );
    }



    // getsubbime() {
    //    // console.log()
    //   //  let {databime} = this.state;
    //    // console.log(databime.value.id);
    //     var codebimes1 = this.state.databime.value.bime.id;
    //
    //     Actions.mainbime({data_subbime: codebimes1});
    // }
}
