import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Define the stack navigator's params
export type RootStackParamList = {
    Support: undefined;
    Wallet: undefined;
    Chat: undefined;
    Home: undefined;
    Profile: undefined;
    Call: undefined;
    Blogs: undefined;
    Notification: undefined;
    History: undefined;
};

// Define a type for stack navigation props
export type NavigationProp = StackNavigationProp<RootStackParamList>;

// Define the type for drawer navigation
export type DrawerNavProp = DrawerNavigationProp<any>;

// Define props for a component that receives drawer navigation
export type HeaderMainProps = {
    navigation: DrawerNavProp;
};
