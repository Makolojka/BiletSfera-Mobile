import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView, ImageBackground,
} from 'react-native';
import {COLORS} from "./Colors";
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AuthService from "../../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            if(await AuthService.isLoggedIn()){
                // console.log("token: ", AuthService.isLoggedIn())
                props.navigation.navigate('UserNav');
            }
        };
        let a = fetchData();

        // The cleanup function
        return () => {};

    }, [props.navigation]);

    const logIn = async () => {
        const isAuthenticated = await AuthService.authenticate({ login, password });
        if (isAuthenticated === 'Unauthorized') {
            showMessage({
                message: 'Nieprawidłowe dane logowania.',
                type: 'danger',
                backgroundColor: COLORS.red,
                color: COLORS.main,
                style: { display: 'flex', alignContent: 'center', alignItems: 'center' }
            });
        } else if (isAuthenticated) {
            showMessage({
                message: 'Zalogowano.',
                type: 'success',
                backgroundColor: COLORS.green,
                color: COLORS.main,
                style: { display: 'flex', alignContent: 'center', alignItems: 'center' }
            });
            await goToRegister();
        } else {
            showMessage({
                message: 'Nieznany błąd.',
                type: 'danger',
                backgroundColor: COLORS.red,
                color: COLORS.main,
                style: { display: 'flex', alignContent: 'center', alignItems: 'center' }
            });
        }
    };

    const goToRegister = async () => {
        props.navigation.navigate('UserNav');
        setLogin('');
        setPassword('');
    }

    const validateFields = async () => {
        if (login === '' || password === '' || login == null || password == null) {
            showMessage({
                message: 'Uzupełnij wszystkie pola.',
                type: 'warning',
                backgroundColor: COLORS.red,
                color: COLORS.main,
                style: {display: "flex", alignContent: "center", alignItems: "center"}
            });
        } else {
            try {
                await logIn();
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <ImageBackground
            source={require('../screens/img/bg_1.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView style={styles.container}>

            <View style={styles.section}>
                <View style={styles.logoContainer}>
                    <View style={styles.column}>
                        <Image
                            style={styles.logo}
                            source={require('../screens/img/logoWhite.png')}
                        />
                        <View style={styles.column}>
                            <Text style={styles.textWelcome}>Witaj w BiletSferze</Text>
                            <Text style={styles.textWelcome2}>
                                Zaloguj się, aby kontynuować.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                    <View>
                        <Text style={styles.textInput}>Login</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setLogin}
                            value={login}
                            // placeholder="Login"
                            keyboardType="default"
                        />
                        <Text style={styles.textInput}>Hasło</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            // placeholder="Hasło"
                            keyboardType="default"
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.button} onPress={validateFields}>
                            <Text style={styles.text}>Zaloguj się</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.register} onPress={goToRegister}>
                                Nie masz konta? Zarejestruj się.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
            <FlashMessage position="top" />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    section: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        margin: 20,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,

    },
    box: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 0,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
    },
    button: {
        justifyContent: 'center',
        borderBottomWidth: 1,
        padding: 12,
        margin: 25,
        width: 250,
        borderRadius: 5,
        borderColor: COLORS.second,
        backgroundColor: COLORS.second,
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
    textWelcome: {
        textAlign: 'center',
        color: COLORS.main,
        fontSize: 32,
        fontWeight: 'bold',
        margin: 10,
        marginBottom: 20,
    },
    textWelcome2: {
        textAlign: 'center',
        color: COLORS.main,
        fontSize: 12,
        fontWeight: 'bold',
    },
    textInput: {
        fontSize: 16,
        textAlign: 'left',
        color: COLORS.main,
        marginTop: 20,
    },
    input: {
        padding: 5,
        paddingLeft: 15,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderRadius: 5,
        borderColor: COLORS.main,
        textAlign: 'left',
        color: COLORS.main,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 100,
        height: 75,
        resizeMode: 'contain',
        margin: 10,
    },
    logoContainer: {
        margin: 10,
        padding: 10,
    },
    register: {
        textAlign: 'center',
        color: COLORS.main,
    },
});
export default LoginScreen;