import { RootStackParamList } from "./navigation.types";
import { ImageSourcePropType } from "react-native";

// poster card props used on homescreen to navigate to different screens
export type PosterProps = {
    image: ImageSourcePropType;
    screenName: keyof RootStackParamList; // Ensures screenName matches a valid screen
};


// Define the type for each Circle Card
export type CircleCardProps = {
    id: number;
    title: string;
    image: ImageSourcePropType;
    screen: keyof RootStackParamList;
};

// Define the type for each Circle Card
export type SquareCardProps = {
    id: number;
    title: string;
    image: ImageSourcePropType;
};

// expert card props used on homescreen to display expert information

export type ExpertCardProps = {
    image: ImageSourcePropType;
    name: string;
    price: number;  // Use lowercase 'number'
    id?: number | null;  // Make 'id' optional
};


// navigation prop used to navigate between screens
export type ExpertCrouselProps = {
    expertCardsData: ExpertCardProps[];

};


// blog crousel props used to display crousel on homescreen

export type BlogCardProps = {
    image: ImageSourcePropType;
    author: string;
    date: string;
    _id?: number | null;
    slug: string;
    title: string;
};

// navigation prop used to navigate between screens
export type BlogCrouselProps = {
    blogCardsData: BlogCardProps[];
};


export type RoundBtnWithIconProps = {
    title: string;
    icon: string;
    screenToGo: keyof RootStackParamList;
};

