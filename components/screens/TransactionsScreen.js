import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import DataService from "../../services/DataService";
import {COLORS} from "./Colors";
import {formatDate} from "../../utils/DataHelper";

const TransactionsScreen = (props) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const transactionsData = await DataService.getAllTransactions();
                const updatedTransactions = await Promise.all(
                    transactionsData.map(async (transaction) => {
                        const ticketDetails = await Promise.all(
                            transaction.tickets.map(async (ticket) => {
                                const ticketDetail = await DataService.getTicketDetailsById(ticket.ticketId);
                                return {
                                    count: ticket.count,
                                    ticketName: ticketDetail.type,
                                    ticketPrice: ticketDetail.price,
                                    eventId: ticket.eventId,
                                    ticketId: ticket.ticketId
                                };
                            })
                        );
                        return { ...transaction, ticketDetails };
                    })
                );
                setTransactions(updatedTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        }

        fetchTransactions();
    }, []);

    const navigateToTicketDetails = (ticketObj, transactionObj) => {
        // console.log("ticketObj eventId: ",ticketObj.eventId)
        // console.log("transactionObj: ",transactionObj)
        props.navigation.navigate('TicketDetails', { ticket: ticketObj, transaction: transactionObj });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Historia zakupów</Text>
            {transactions?.map((transaction, index) => (
                <View key={index} style={styles.transactionItem}>
                    <Text style={styles.transactionDate}>{formatDate(transaction?.saleDate)}</Text>
                    <View style={styles.rowSpaced}>
                        <Text style={styles.textTotal}>
                            Całkowity koszt zamówienia</Text>
                        <Text style={styles.textTotal}>
                            {transaction?.totalCost} zł</Text>
                    </View>
                    <Text style={styles.seats}>
                        Zakupione bilety:</Text>
                    <View>
                        {transaction?.ticketDetails?.map((ticket, idx) => (
                            <View key={idx} style={styles.ticketDetail}>
                                <View style={styles.rowSpaced}>
                                    <Text style={styles.textTotal}>{ticket?.count} bilet(ów) {ticket?.ticketName}</Text>
                                    {/*<Text style={styles.textTotal}>{ticket?.ticketPrice} zł</Text>*/}
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigateToTicketDetails(ticket, transaction)}
                                >
                                    <Text style={styles.buttonText}>Bilet</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 0,
    },
    title: {
        fontSize: 20,
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 10,
        padding: 20,
        paddingLeft: 20,
        marginLeft: 0,
        color: COLORS.third,
        // borderBottomColor: COLORS.third,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    transactionItem: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.mainGrey,
        // borderTopColor: COLORS.main,
        padding: 20,
        paddingTop: 5,
        // elevation: 1,
    },
    transactionDate: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.third,
        fontSize: 18,
    },
    ticketDetail: {
        marginBottom: 5,
    },
    text: {
        color: 'black'
    },
    textTotal: {
      color: COLORS.mainGreyDark,
        fontSize: 16,
    },
    seats: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        color: COLORS.third,
        fontWeight: 'bold'
    },
    button:{
        borderWidth: 1,
        borderColor: COLORS.second,
        backgroundColor: COLORS.second,
        textAlign: "center",
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        margin: 10,
    },
    buttonText:{
        color: COLORS.main,
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: "bold",
    },
    rowSpaced: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
});

export default TransactionsScreen;