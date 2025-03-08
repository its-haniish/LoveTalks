import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    Chat: { userId: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;
