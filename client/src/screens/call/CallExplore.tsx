import React, { useMemo, useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import styles from "./callExploreStyles";
import { Divider, MentorCard, PosterCrousel } from "../../components";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

const CallExplore = () => {
    const [selectedGenderId, setSelectedGenderId] = useState<string | undefined>();
    const [selectedSortId, setSelectedSortId] = useState<string>("relevance");

    const genderRadioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Male',
            value: 'male',
            size: 16
        },
        {
            id: '2',
            label: 'Female',
            value: 'female',
            size: 16
        }
    ]), []);

    const sortRadioButtons = useMemo(() => ([
        {
            id: "relevance",
            label: 'Relevance',
            value: 'relevance',
            size: 16
        },
        {
            id: 'priceHighToLow',
            label: 'Price - High to Low',
            value: 'priceHighToLow',
            size: 16
        },
        {
            id: 'priceLowToHigh',
            label: 'Price - Low to High',
            value: 'priceLowToHigh',
            size: 16
        },
        {
            id: 'expHighToLow',
            label: 'Experience - High to Low',
            value: 'expHighToLow',
            size: 16
        },
        {
            id: 'expLowToHigh',
            label: 'Experience - Low to High',
            value: 'expLowToHigh',
            size: 16
        }
    ]), []);

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Callback for handling BottomSheet changes
    const handleSheetChanges = useCallback((index: number) => {
        index !== 1 ? console.log('Filters Close') : console.log('Filters Open');

    }, []);

    // Function to open BottomSheet
    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    // Function to close BottomSheet
    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
    };

    const onGenderRadioBtnPress = (id: string) => {
        setSelectedGenderId(id); // Update the selected radio button
    };
    const onSortRadioBtnPress = (id: string) => {
        setSelectedSortId(id); // Update the selected radio button
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <TouchableWithoutFeedback onPress={closeBottomSheet}>
                <>
                    <PosterCrousel />
                    <View style={styles.mainContainer}>
                        <View style={styles.filterContainer}>
                            <View style={styles.appNameContainer}>
                                <Text style={styles.appNamePinkTxt}>Love</Text>
                                <Text style={styles.appNameBlueTxt}>Calls</Text>
                            </View>
                            <TouchableOpacity onPress={openBottomSheet}>
                                <View style={styles.filterBtnContainer}>
                                    <FontAwesome6 name="sliders" size={14} color="black" />
                                    <Text style={styles.filterbtnTxt}>Filters</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Divider />

                        <ScrollView showsVerticalScrollIndicator={false} >
                            <MentorCard type='call' />
                            <MentorCard type='call' />
                            <MentorCard type='call' />
                            <MentorCard type='call' />
                            <MentorCard type='call' />
                            <MentorCard type='call' />
                            <MentorCard type='call' />
                            <MentorCard type='call' />
                            <MentorCard type='call' />
                        </ScrollView>
                    </View>
                </>
            </TouchableWithoutFeedback>

            {/* BottomSheet Component */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Initially hidden
                snapPoints={["50%"]}
                onChange={handleSheetChanges}
                enablePanDownToClose={true} // Allows closing when pulled down
                backdropComponent={(props) => (
                    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
                )}
            >
                <BottomSheetView style={styles.bottomSheetContainer}>
                    <View style={styles.filterTitleContainer}>
                        <Text style={styles.sortAndFilterTitle}>Filters</Text>
                        {/* remove filters btn   */}
                        {
                            selectedGenderId && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedGenderId(undefined);
                                        setSelectedSortId("relevance");
                                    }}
                                >
                                    <Text style={styles.removeFiltersBtn}>Remove Filters</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>

                    <View style={styles.filtersContaniner}>
                        <View style={styles.filtersNameContainer}>
                            <Text style={styles.filterName}>Gender</Text>
                        </View>

                        <View style={styles.filtersRasioBtnsContainer}>
                            <RadioGroup
                                radioButtons={genderRadioButtons}
                                onPress={onGenderRadioBtnPress}
                                layout="row"
                                selectedId={selectedGenderId}
                                containerStyle={styles.radioBtnContainer}
                            />
                        </View>



                    </View>

                    {/* Fix applied here */}
                    <View style={styles.sortingContainer}>
                        <View style={styles.filterTitleContainer}>
                            <Text style={styles.sortAndFilterTitle}>Sort</Text>
                        </View>
                        <View style={styles.sortsContainer}>

                            <RadioGroup
                                radioButtons={sortRadioButtons}
                                onPress={onSortRadioBtnPress}
                                layout="column"
                                selectedId={selectedSortId}
                                containerStyle={styles.sortRadioBtnContainer}
                            />

                        </View>
                    </View>

                </BottomSheetView>

            </BottomSheet>
        </GestureHandlerRootView >
    );
};

export default CallExplore;
