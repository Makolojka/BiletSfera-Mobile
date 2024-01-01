import AuthService from "../../services/AuthService";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {COLORS} from "./Colors";
import QRCode from "react-native-qrcode-svg";
import DataService from "../../services/DataService";
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Szczegóły biletu</Text>
            <View style={styles.tilesContainer}>
                <Text style={styles.label}>Bilet na wydarzenie: {eventDetails?.title}</Text>
                <Text style={styles.label}>Typ/nazwa biletu: {ticket.ticketName}</Text>
                <Text style={styles.label}>Cena za pojedynczy bilet: {ticket.ticketPrice}</Text>
                <Text style={styles.label}>Ilość biletów: {ticket.count}</Text>

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
                <View style={styles.qrContainer}>
                    <Text style={styles.label}>Kod QR:</Text>
                    <QRCode
                        value={transaction.id}
                        size={150}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
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
    // Other styles remain the same as provided
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: COLORS.third,
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
    qrContainer: {
        alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
    },
});


export default TicketDetailsScreen;