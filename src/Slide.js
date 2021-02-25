import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, LogBox, Switch, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker';

LogBox.ignoreAllLogs();


export default function Slide() {

    const prevTrama = '78 63 238 125';

    let prevValues = tramaToColor(prevTrama);

    let prevColor = prevValues.colorHex;
    let prevWhite = prevValues.white;

    const [colorLed, setColorLed] = useState(prevColor);

    const [whiteLed, setWhiteLed] = useState(prevWhite);

    const [textColor, setTextColor] = useState(prevColor);

    const [colorSwitch, setcolorSwitch] = useState(false);
    const [whiteSwitch, setwhiteSwitch] = useState(false);

    const [pass1, setPass1] = useState(false);
    const [pass2, setPass2] = useState(false);

    useEffect(() => {

        if (colorSwitch) {

            let tramaLEDWhite = whiteSwitch ? ` ${whiteLed}` : ` 0`;
            let tramaLED = hexToRGBTrama(colorLed) + tramaLEDWhite;

            console.log(tramaLED);
            setTextColor(colorLed);
        }

    }, [colorLed]);

    useEffect(() => {

        if (whiteSwitch) {

            let tramaLEDColor = colorSwitch ? `${hexToRGBTrama(colorLed)}` : `0 0 0`;
            let tramaLED = `${tramaLEDColor} ${whiteLed}`;

            console.log(tramaLED);
        }
    }, [whiteLed]);

    useEffect(() => {
        if (pass1) {
            let tramaLEDWhite = whiteSwitch ? ` ${whiteLed}` : ` 0`;
            let tramaLED = colorSwitch ? hexToRGBTrama(colorLed) + tramaLEDWhite : `0 0 0${tramaLEDWhite}`;

            console.log(tramaLED);
            return;
        }
        setPass1(true)

    }, [colorSwitch]);

    useEffect(() => {
        if (pass2) {
            let tramaLEDColor = colorSwitch ? `${hexToRGBTrama(colorLed)}` : `0 0 0`;
            let tramaLED = whiteSwitch ? `${tramaLEDColor} ${whiteLed}` : `${tramaLEDColor} 0`;

            console.log(tramaLED);
            return;
        }
        setPass2(true);

    }, [whiteSwitch]);

    const exitComponent = () => {
        console.log('@');
    }


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'lightgrey' }}>

            <View style={styles.colorLedPickContainer}>
                <View style={styles.colorLedPick}>
                    <ColorPicker
                        color={prevColor}
                        onColorChange={color => setColorLed(color)}
                        // onColorChangeComplete={color => setColorLed(color)}
                        swatches={false}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={false}
                        row={false}
                    />
                </View>
            </View>

            <View style={styles.colorLedOptions}>

                <View style={styles.showColorContainer}>
                    <View style={[styles.showColor, { backgroundColor: colorLed != '' ? colorLed : prevColor }]}>
                        <Text>{textColor}</Text>
                    </View>
                </View>

                <View style={styles.switchColor}>
                    <Switch
                        style={{ height: 50, width: 50 }}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={colorSwitch ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setcolorSwitch(previousState => !previousState)}
                        value={colorSwitch}
                    />
                </View>

            </View>

            <View style={styles.whiteLed}>

                <View style={styles.whiteSlider}>
                    <Slider
                        style={{ width: '85%', height: 50 }}
                        minimumValue={0}
                        maximumValue={255}
                        value={prevWhite}
                        onValueChange={valor => setWhiteLed(Math.round(valor))}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity
                        style={styles.backImage}
                        onPress={exitComponent}
                    >
                        <Image
                            style={{ width: 60, height: 60, }}
                            source={require('./assets/back.png')}
                        />
                    </TouchableOpacity>

                    <Switch
                        style={{ height: 50, width: 50 }}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={whiteSwitch ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setwhiteSwitch(previousState => !previousState)}
                        value={whiteSwitch}
                    />
                </View>

            </View>
        </View>

    )

}

const hexToRGBTrama = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const tramaToColor = (trama) => {

    let r = '';
    let g = '';
    let b = '';
    let w = '';

    let j = 1;
    for (let i = 0; i < trama.length; i++) {
        if (trama[i] != ' ') {
            if (j === 1) {
                r += trama[i];
            }
            if (j === 2) {
                g += trama[i];
            }
            if (j === 3) {
                b += trama[i];
            }
            if (j === 4) {
                w += trama[i];
            }
        } else {
            j++;
        }
    }
    const Red = parseInt(r);
    const Green = parseInt(g);
    const Blue = parseInt(b);
    const White = parseInt(w);

    return {
        colorHex: rgbToHex(Red, Green, Blue),
        white: White,
    }
}

const styles = StyleSheet.create({
    colorLedPickContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    colorLedPick: {
        width: '85%',
        height: '95%',
        justifyContent: 'center'
    },

    colorLedOptions: {
        flex: 2,
        flexDirection: 'row',
    },

    whiteLed: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    showColor: {
        flex: 1,
        margin: '15%',
        borderWidth: 4,
        borderRadius: 20,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    showColorContainer: {
        flex: 1,
    },

    switchColor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    whiteSlider: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    footer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',

    },

    backImage: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    },


})
