import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { Payslip } from './screens/Payslip';
import { NotFound } from './screens/NotFound';

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: Home,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Payslip: {
      screen: Payslip,
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
