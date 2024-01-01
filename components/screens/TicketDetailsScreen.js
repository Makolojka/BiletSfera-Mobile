import AuthService from "../../services/AuthService";
import {ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {COLORS} from "./Colors";
import QRCode from "react-native-qrcode-svg";
import DataService from "../../services/DataService";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
const TicketDetailsScreen = (props) => {
    const [ticket, setTicket] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [eventDetails, setEventDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // console.log("transaction: ",transaction)
            const eventDetails = await DataService.getEventDetailsById(props.route.params.ticket.eventId);
            setEventDetails(eventDetails);
            setTicket(props.route.params.ticket);
            setTransaction(props.route.params.transaction);
            // props.route.params.transaction?.tickets[0].seatNumbers.length
        };
        fetchData();
    }, [props.route.params.ticket, props.route.params.transaction]);


    const navigateToEventDetails = (eventId) => {
        console.log("eventId:", eventId)
        // props.navigation.navigate('EventDetails', { eventId });
    };

    return (
        <ImageBackground
            source={require('../screens/img/bg_1.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Szczegóły biletu</Text>
                <View style={styles.tilesContainer}>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.titleText}>{eventDetails?.title}</Text>
                        <View style={styles.row}>
                            <MaterialIcons style={styles.icon} name="tag" color="#333" />
                            <Text style={styles.text}>{ticket.ticketName}</Text>
                            <Text style={styles.text}>x {ticket.count}</Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons style={styles.icon} name="clock-outline" color="#333" />
                            <Text style={styles.text}>{eventDetails.date}</Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons style={styles.icon} name="google-maps" color="#333" />
                            <Text style={styles.text}>{eventDetails.location}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.seatNumbers}>
                                {transaction?.tickets?.map((ticket, index) => (
                                    <View key={index} style={styles.row}>
                                        {ticket.seatNumbers && ticket.seatNumbers.length > 0 && (
                                            <MaterialIcons style={styles.icon} name="seat-recline-extra" color="#333" />
                                        )}
                                        {ticket.seatNumbers?.map((seat, idx) => (
                                            <Text key={idx} style={styles.seat}>{seat}</Text>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.rowSum}>
                            <Text style={styles.textSum}>Cena całkowita</Text>
                            <Text style={styles.priceTotal}>{transaction.totalCost} zł</Text>
                        </View>
                    </View>
                    <View style={styles.qrContainer}>
                        <Text style={styles.label}>Kod QR:</Text>
                        <QRCode
                            value={transaction.id}
                            size={150}
                        />
                        <Text style={styles.label}>Więcej informacji o wydarzeniu znajdziesz tutaj:
                            <Text style={styles.more} onPress={() => navigateToEventDetails(ticket.eventId)}> szczegóły</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: COLORS.third,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: COLORS.third,
        textAlign: 'center',
    },
    seatNumbers: {
        alignItems: 'center',
        marginBottom: 0,
    },
    ticketIndex: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.third,
    },
    seat: {
        fontSize: 18,
        color: 'black',
        marginRight: 5,
        marginLeft: 15,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    qrContainer: {
        alignItems: 'center',
        padding: 20,
        marginTop: 3,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    rowSum: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 0,
    },
    textSum: {
        fontSize: 22,
        color: COLORS.third,
    },
    priceTotal: {
        fontSize: 22,
        color: COLORS.second,
        fontWeight: 'bold',
    },
    text: {
        padding: 5,
        fontSize: 18,
        color: COLORS.mainGreyDark,
        marginLeft: 10,
    },
    titleText: {
        fontSize: 20,
        color: COLORS.third,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    icon: {
        fontSize: 22,
        color: COLORS.third,
    },
    button: {
        margin: 0,
        padding: 0,
        backgroundColor: COLORS.third
    },
    more: {
        fontSize: 20,
        color: COLORS.second,
    },
});


export default TicketDetailsScreen;