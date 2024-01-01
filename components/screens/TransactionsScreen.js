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
                    <Text style={styles.text}>Całkowity koszt zamówienia: {transaction?.totalCost} zł</Text>
                    <Text style={{marginTop: 10, color: COLORS.third, fontWeight: 'bold'}}>Zakupione bilety:</Text>
                    <View>
                        {transaction?.ticketDetails?.map((ticket, idx) => (
                            <View key={idx} style={styles.ticketDetail}>
                                <Text style={styles.text}>{ticket?.count} bilet(ów) {ticket?.ticketName} - {ticket?.ticketPrice} zł</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigateToTicketDetails(ticket, transaction)}
                                >
                                    <Text style={styles.buttonText}>Szczegóły</Text>
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
        padding: 20,
    },
    title: {
        fontSize: 20,
        // borderBottomWidth: 1,
        // paddingBottom: 20,
        marginBottom: 20,
        color: COLORS.third,
        // borderBottomColor: COLORS.third,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    transactionItem: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.third,
        padding: 10,
        elevation: 1,
    },
    transactionDate: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.third
    },
    ticketDetail: {
        marginBottom: 5,
    },
    text: {
        color: 'black'
    },
    button:{
        borderWidth: 1,
        borderColor: COLORS.third,
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
    }
});

export default TransactionsScreen;