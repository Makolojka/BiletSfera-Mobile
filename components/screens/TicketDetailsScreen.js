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
            const eventDetails = await DataService.getEventDetailsById(props.route.params.ticket.eventId);
            setEventDetails(eventDetails);
            setTicket(props.route.params.ticket);
            setTransaction(props.route.params.transaction);
        };
        fetchData();
    }, [props.route.params.ticket, props.route.params.transaction]);


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
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons style={styles.icon} name="clock-outline" color="#333" />
                            <Text style={styles.text}>{eventDetails.date}</Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons style={styles.icon} name="money" color="#333" />
                            <Text style={styles.text}>{ticket.ticketPrice}</Text>
                        </View>
                        <Text style={styles.text}>Cena za pojedynczy bilet: </Text>
                        <Text style={styles.text}>Ilość biletów: {ticket.count}</Text>
                        <View style={styles.seatNumbers}>
                            {ticket.seatNumbers && ticket.seatNumbers.length > 0 && (
                                <Text style={styles.label}>Numery siedzeń:</Text>
                            )}
                            {transaction?.tickets?.map((ticket, index) => (
                                <View key={index} style={styles.row}>
                                    {ticket.seatNumbers?.map((seat, idx) => (
                                        <Text key={idx} style={styles.seat}>{seat}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.qrContainer}>
                        <Text style={styles.label}>Kod QR:</Text>
                        <QRCode
                            value={transaction.id}
                            size={150}
                        />
                        <Text style={styles.label}>Więcej informacji o wydarzeniu znajdziesz tutaj:
                            <Text style={styles.more}> szczegóły</Text>
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
        margin: 10,
        color: COLORS.third,
        textAlign: 'center',
    },
    seatNumbers: {
        marginBottom: 20,
    },
    ticketIndex: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.third,
    },
    seat: {
        fontSize: 14,
        color: 'black',
        marginRight: 10,
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
    text: {
        fontSize: 18,
        color: COLORS.mainGreyDark,
        marginLeft: 10,
    },
    titleText: {
        fontSize: 20,
        color: COLORS.third,
        fontWeight: 'bold',
    },
    more: {
        fontSize: 20,
        color: COLORS.second
    },
    icon: {
        fontSize: 22,
        color: COLORS.third,
    },
});


export default TicketDetailsScreen;