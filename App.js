import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      quiz: {}, 
      isHidden: true,
    }
    this.handleOnPress = this.handleOnPress.bind(this);
  }

  handleOnPress() {
    fetch(`http://169.254.189.120:3000/api/v1/room/${this.state.code}`)
      .then(res => res.json())
      .then(quiz => {
        this.setState({ quiz, isHidden: false })
      })
  }

  render() {
    if (!this.state.isHidden) {
      return (
        <View style={styles.mainQuiz}>
          <Text>{this.state.quiz.id}</Text>
          <Text>{this.state.quiz.name}</Text>
          <Text>{this.state.quiz.subject}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Quizzam</Text>
        <View style={styles.formWrapper}>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder="Enter name"
          />
          <Text style={styles.label}>Code</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={(code) => this.setState({ code })}
            value={this.state.code}
            autoCapitalize="characters"
            placeholder="Enter code"
          />
          <View style={styles.startBtn}>
            <Button
              onPress={this.handleOnPress}
              title="Start"
              color="#FFF"
              fontSize="40"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainQuiz: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    fontSize: 70,
    marginBottom: 50,
    marginTop: 50,
    fontFamily: 'Avenir Next',
    color: '#353535'
  },
  formWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#22C4FC',
    width: 300,
    height: 300,
    paddingLeft: 30,
    borderRadius: 5,
    shadowOffset:{ width: 10, height: 10 },
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1.0,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    width: 220,
    height: 50,
    borderColor: '#FFF',
    color: '#FFF',
    fontSize: 30,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  label: {
    color: '#FFF',
    fontSize: 30,
  },
  startBtn: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
    marginBottom: 5,
  },
});
