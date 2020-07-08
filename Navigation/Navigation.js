// Navigation/Navigation.js

import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import WelcomeScreen from '../Screens/WelcomeScreen'
import LoginScreen from '../Screens/LoginScreen'
import SignUpScreen from '../Screens/SignUpScreen'
import GenerateNewProgramScreen from '../Screens/GenerateNewProgramScreen'
import GeneratedProgramScreen from '../Screens/GeneratedProgramScreen'
import ProgramsScreen from '../Screens/ProgramsScreen'
import ShoulderScreen from '../Screens/ShoulderScreen'
import ChestScreen from '../Screens/ChestScreen'
import BackScreen from '../Screens/BackScreen'
import BicepsScreen from '../Screens/BicepsScreen'
import TricepsScreen from '../Screens/TricepsScreen'
import LegScreen from '../Screens/LegScreen'
import ExerciseDetailsScreen from '../Screens/ExerciseDetailsScreen'
import SettingsScreen from '../Screens/SettingsScreen'
import ChangeLevelGoalScreen from '../Screens/ChangeLevelGoalScreen'
import ContactUsScreen from '../Screens/ContactUsScreen'
import SignupNextPage from '../Components/SignupNextPage'
import ExercisesList from '../Components/ExercisesList'

const SignUpScreenStackNavigator = createStackNavigator({
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Sign up'
    }
  },
  /*SignupNextPage: {
    screen: SignupNextPage,
    navigationOptions: {
      title: 'Sign up'
    }
  }*/
})

const GenerateNewProgramStackNavigator = createStackNavigator({
  GenerateNewProgramScreen: {
    screen: GenerateNewProgramScreen,
    navigationOptions: {
      title: 'Generate a Program'
    }
  },
  GeneratedProgramScreen: {
    screen: GeneratedProgramScreen,
    navigationOptions: {
      title: 'This is the new program'
    }
  }
})

const ProgramStackNavigator = createStackNavigator({
  ProgramsScreen: {
    screen: ProgramsScreen,
    navigationOptions: {
      title: 'Programs',
    }
  },
  ExercisesList: {
    screen: ExercisesList,
    navigationOptions: {
      title: 'Programs'
    }
  }
})

const ShoulderStackNavigator = createStackNavigator({
  ShoulderScreen: {
    screen: ShoulderScreen,
    navigationOptions: {
      title: 'Shoulder exercises',
      /*headerStyle: {height: 10},
      headerTitleStyle: {backgroundColor: 'red'},
      headerTitleContainerStyle: {backgroundColor: 'green', marginBottom: 10}*/
    }
  },
  ExerciseDetailsScreen: {
    screen: ExerciseDetailsScreen,
    navigationOptions: {
      title: 'Details'
    }
  }
})
const ChestStackNavigator = createStackNavigator({
  ChestScreen: {
    screen: ChestScreen,
    navigationOptions: {
      title: 'Chest exercises'
    }
  },
  ExerciseDetailsScreen: {
    screen: ExerciseDetailsScreen,
    navigationOptions: {
      title: 'Details'
    }
  }
})
const BackStackNavigator = createStackNavigator({
  BackScreen: {
    screen: BackScreen,
    navigationOptions: {
      title: 'Back exercises'
    }
  },
  ExerciseDetailsScreen: {
    screen: ExerciseDetailsScreen,
    navigationOptions: {
      title: 'Details'
    }
  }
})
const BicepsStackNavigator = createStackNavigator({
  BicepsScreen: {
    screen: BicepsScreen,
    navigationOptions: {
      title: 'Biceps exercises'
    }
  },
  ExerciseDetailsScreen: {
    screen: ExerciseDetailsScreen,
    navigationOptions: {
      title: 'Details'
    }
  }
})
const TricepsStackNavigator = createStackNavigator({
  TricepsScreen: {
    screen: TricepsScreen,
    navigationOptions: {
      title: 'Triceps exercises'
    }
  },
  ExerciseDetailsScreen: {
    screen: ExerciseDetailsScreen,
    navigationOptions: {
      title: 'Details'
    }
  }
})
const LegStackNavigator = createStackNavigator({
  LegScreen: {
    screen: LegScreen,
    navigationOptions: {
      title: 'Leg exercises'
    }
  },
  ExerciseDetailsScreen: {
    screen: ExerciseDetailsScreen,
    navigationOptions: {
      title: 'Details'
    }
  }
})

const MusclesDrawerNavigator = createDrawerNavigator({
  ShoulderScreen: {
    screen: ShoulderStackNavigator,
    navigationOptions: {
      title: 'Shoulder exercises'
    }
  },
  ChestScreen: {
    screen: ChestStackNavigator,
    navigationOptions: {
      title: 'Chest exercises'
    }
  },
  BackScreen: {
    screen: BackStackNavigator,
    navigationOptions: {
      title: 'Back exercises'
    }
  },
  BicepsScreen: {
    screen: BicepsStackNavigator,
    navigationOptions: {
      title: 'Biceps exercises'
    }
  },
  TricepsScreen: {
    screen: TricepsStackNavigator,
    navigationOptions: {
      title: 'Triceps exercises'
    }
  },
  LegScreen: {
    screen: LegStackNavigator,
    navigationOptions: {
      title: 'Leg exercises'
    }
  }
})

const SettingsStackNavigator = createStackNavigator({
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings'
    }
  },
  ChangeLevelGoalScreen: {
    screen: ChangeLevelGoalScreen,
    navigationOptions: {
      title: 'Level & Goal'
    }
  },
  ContactUsScreen: {
    screen: ContactUsScreen,
    navigationOptions: {
      title: 'Contact Us'
    }
  }
})

const ProgramsAndExercisesTopTabNavigator = createMaterialTopTabNavigator(
  {
    Programs: {
      screen: ProgramStackNavigator,
    },
    Exercises: {
      screen: MusclesDrawerNavigator
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      upperCaseLabel: false,
      //style: {top: 40}
    }
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    GenerateNewProgramStackNavigator: {
      screen: GenerateNewProgramStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_new_prog.png')}
            style={styles.icon}/>
        },
        title: 'Create'
      }
    },
    ProgramsAndExercisesTopTabNavigator: {
      screen: ProgramsAndExercisesTopTabNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_gym.png')}
            style={styles.icon}/>
        },
        title: 'Programs & Exercises'
      }
    },
    SettingsStackNavigator: {
      screen: SettingsStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_settings.png')}
            style={styles.icon}/>
        },
        title: 'Settings'
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#ddd',
      inactiveBackgroundColor: '#fff',
      showLabel: true,
      showIcon: true
    }
  }
)

const WelcomeSwitchNavigator = createSwitchNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen
  },
  TabNavigator: {
    screen: TabNavigator
  }
})

/*const LoginNavigator = createSwitchNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  TabNavigator: {
    screen: TabNavigator
  },
  SignUpScreenStackNavigator: {
    screen: SignUpScreenStackNavigator
  }
})*/

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25
  }
})

export default createAppContainer(WelcomeSwitchNavigator)
