import {ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {COLORS} from "./Colors";
import QRCode from "react-native-qrcode-svg";
import DataService from "../../services/DataService";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
const EventDetailsScreen = (props) => {
    // const [eventId, setEventId] = useState([]);
    const [artists, setArtists] = useState([]);
    const [eventDetails, setEventDetails] = useState([]);
    const [showFullText, setShowFullText] = useState(false);
    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    const renderText = () => {
        const additionalText = eventDetails?.additionalText || '';
        if (showFullText || additionalText.length <= 200) {
            return additionalText;
        } else {
            return additionalText.slice(0, 200) + '...';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const eventDetails = await DataService.getEventDetailsById(props.route.params.eventId);
            // console.log("eventDetails: ",eventDetails)
            // console.log("eventDetails artists: ",eventDetails.artists)
            setEventDetails(eventDetails);

            const artists = await DataService.getArtistDetailsById(props.route.params.eventId);
            // console.log("artists: ",artists)
            setArtists(artists);
            // setTicket(props.route.params.ticket);
            // setTransaction(props.route.params.transaction);
            // // props.route.params.transaction?.tickets[0].seatNumbers.length
        };
        fetchData();
    }, [props.route.params.eventId]);

    return (
        <ScrollView>
            {eventDetails && eventDetails.image && (
            <ImageBackground
                source={{ uri: eventDetails.image }}
                style={styles.banner}
            >
                {/* Top banner */}
            </ImageBackground>
            )}
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    {/*<Text style={styles.sectionTitle}>Nazwa wydarzenia</Text>*/}
                    <Text style={styles.titleText}>{eventDetails.title}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>Data</Text>
                    <Text style={styles.sectionContent}>{eventDetails.date}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.sectionTitle}>Opis wydarzenia</Text>
                        <Text style={styles.sectionContent}>{renderText()}</Text>
                        {eventDetails?.additionalText?.length > 200 && (
                            <TouchableOpacity onPress={toggleText}>
                                <Text style={{color: COLORS.second, fontSize: 16}}>{showFullText ? 'Mniej' : 'Więcej'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>Lokalizacja</Text>
                    <Text style={styles.sectionContent}>{eventDetails.location}</Text>
                </View>

                {/* Artists section */}
                {artists.length > 0 && (
                    <View style={styles.artistContainer}>
                        <Text style={styles.sectionTitle}>Artyści biorący udział</Text>
                        <ScrollView horizontal>
                            {artists.map((artist, index) => (
                                <View key={index} style={styles.artistCircle}>
                                    {artist && artist.image && (
                                        <Image source={{ uri: artist.image }} style={styles.artistImage} />
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    infoContainer: {
      paddingBottom: 20,
      marginBottom: 0,
      // borderBottomWidth: 1,
      // borderColor: COLORS.secondGrey,
    },
    banner: {
        height: 650,
        // width: "auto",
        resizeMode: "contain",
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginTop: 20,
        marginBottom: 5,
        color: COLORS.third,
    },
    sectionContent: {
        fontSize: 18,
        color: COLORS.thirdGrey,
    },
    artistContainer: {
        flex: 1,
    },
    artistCircle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: COLORS.third,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Add this line
    },
    artistImage: {
        width: 80, // Adjust the width and height to fit the circle without border radius
        height: 80,
        // borderRadius: 40, // Remove this line
    },
    titleContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        marginBottom: 0,
    },
    titleText: {
        width: '100%',
      textAlign: 'center',
      fontSize: 22,
      color: COLORS.third,
      textTransform: "uppercase",
      borderBottomWidth: 1,
      paddingBottom: 20,
      borderColor: COLORS.thirdGrey,
    },
});


export default EventDetailsScreen;