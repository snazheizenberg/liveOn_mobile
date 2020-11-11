import React from "react";
import { Container, Content, Button, Icon, Text, List, ListItem, Toast } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, TouchableHighlight} from "react-native"
import UserAvatar from 'react-native-user-avatar';
import services from "./../services";
import ImagePicker from 'react-native-image-picker';
import Loading from 'react-native-whc-loading';


class Incident extends React.Component {

  state = {
    photo: null,
    modalVisible: false,
    responseUnit: [],
    proceedBtn: false
  }

  componentDidMount= () => {
    this.getResUnit
  }

  checkToProceed = () => {
    if(this.state.photo == null) {
      Toast.show({
				text: "please take or pic photo",
				position: "bottom",
        type: "warning",
			})
    }
    else {
      this.setModalVisible(true);
      this.getResUnit()
    }
  }


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  handleChoosePhoto = () => {
    const options = {
       title: 'Choose',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
  },
    };
      this.refs.loading.show()

    ImagePicker.showImagePicker(options, Response => {
      // console.log("response = ", Response );

      if(Response.uri) {
        this.setState({
          photo: Response
        })
      this.setState({
      proceedBtn: true
    })
    this.refs.loading.close()
      }
    })
   
  }

  getResUnit = () => {
    services.axios.get(services.endpoints.GETRESUNIT).then((res) => {
      if(res.data) {
        this.setState({
          responseUnit: res.data
        })
      }
        this.state.responseUnit.map((unit) => {
          console.log(unit);
        })
    })
  }

  send = () => {
    Toast.show({
				text: "Succesfull",
				position: "top",
        type: "success",
			})
    this.setState({
      photo: null
    })
    this.setState({
      modalVisible: false
    })
    this.setState({
      proceedBtn: false
    })
  }

  
  render() {
    const { photo, modalVisible } = this.state;
    
    return (
      <View
        style={{
          backgroundColor: '#F0EFEF',
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
  				<Loading ref="loading" backgroundColor='transparent' indicatorColor='white' />

        {/* <Header Title="this is it"/> */}
        <View>
        {photo && (
          <UserAvatar
          imageStyle={{backgroundColor: "red", width: 300, height: 300, borderRadius: 20,
          shadowRadius: 10,
          shadowOpacity: 0.2,}}
            size={300}
            name="Avishay Bar"
            src={photo.uri}
            // style={{
            //   borderRadius: 0,
            //   shadowRadius: 10,
            //   shadowOpacity: 0.2,
            // }}
          />

        )}
        </View>
        <View>
        {/* <Text>click to add photo</Text> */}
          <Button vertical style={{backgroundColor: 'white', margin: 10}}
          onPress={this.handleChoosePhoto}>
            <Icon
              name="camera"
              type="FontAwesome"
              style={{
                color: '#1AA08A',
                fontSize: 30,
                padding: 30,
                marginTop: 30,
              }}
            />
          </Button>
        </View>
        <View>
        {
              this.state.proceedBtn && (
                <Button
            rounded
            light
            onPress={() => {
              this.checkToProceed()
            }}
            style={{
              width: 270,
              height: 55,
              backgroundColor: 'white',
              color: 'green',
            }}>

            
            <Text
              style={{
                color: '#1AA08A',
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 80,
              }}>
              Proceed
            </Text>
          </Button>
              )
        }
          
        </View>
        <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalView}>
            <View>
              <List>
                <ListItem
                  style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                  {this.state.responseUnit.map((unit) => (
                  <TouchableOpacity key={unit.id}
                    onPress={this.send}>
                    <Text style={{marginVertical: 5}}>{unit.name}</Text>
                  </TouchableOpacity>
                ))}
                </ListItem>
              </List>
              <TouchableHighlight
                style={styles.openButton }
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    icon: {
        color: "#B8AFAF"
    },

    iconText: {
        color: "#AC9D9D"
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      marginVertical: 100,
      padding: 30,
      marginTop: 80,
      marginHorizontal: 30,
      width: 350,
      backgroundColor: "white",
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.025,
      shadowRadius: 0.5,
      elevation: 5
    },
    openButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: "#B8AFAF"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
})

export default Incident;