import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, LogBox, Switch } from 'react-native';
// import { ColorPicker, ColorPickerRef } from 'react-native-color-picker-light';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker';

LogBox.ignoreAllLogs();

export default function Slide() {

    const prevTrama = '78 63 238 125';

    let prevValues = tramaToColor(prevTrama);

    // let prevColor = '#4e3fee';
    let prevColor = prevValues.colorHex;
    let prevWhite = prevValues.white;


    // const picker = useRef();

    const [colorLed, setColorLed] = useState(prevColor);
    const [prevColorLed, setPrevColorLed] = useState(colorLed);

    const [whiteLed, setWhiteLed] = useState(prevWhite);
    const [prevWhiteLed, setPrevWhiteLed] = useState(whiteLed);

    const [isColorLedChanged, setIsColorLedChanged] = useState(false);
    const [isWhiteLedChanged, setIsWhiteLedChanged] = useState(false);

    const [textColor, setTextColor] = useState(prevColor);

    const [colorSwitch, setcolorSwitch] = useState(false);
    const [whiteSwitch, setwhiteSwitch] = useState(false);

    useEffect(() => {

        if (colorSwitch || whiteSwitch) {
            let tramaLEDColor = colorSwitch ? `${hexToRGBTrama(colorLed)}` : `0 0 0`;
            let tramaLEDWhite = whiteSwitch ? ` ${whiteLed}` : ` 0`;
            let tramaLED = tramaLEDColor + tramaLEDWhite;

            if (!colorSwitch || !whiteSwitch) {
                if (!colorSwitch && colorLed != prevColorLed) return;
                if (!whiteSwitch && whiteLed != prevWhiteLed) return;
            }

            setPrevColorLed(colorLed);
            setPrevWhiteLed(whiteLed);

            console.log(tramaLED);
            setTextColor(colorLed);
        }

    }, [colorLed, whiteLed]);

    // useEffect(() => {

    //     setPrevWhiteLed(whiteLed);

    //     if (whiteLed != prevWhite && isWhiteLedChanged) {
    //         console.log(whiteLed);
    //     }
    // }, [whiteLed]);

    const changeColor = (color) => {
        setColorLed(color);
        setIsColorLedChanged(true);
    }

    const changeWhite = (valor) => {
        setIsWhiteLedChanged(true);
        setWhiteLed(Math.round(valor));
    }



    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'lightgrey' }}>

            <View style={styles.colorLedPick}>
                <View style={{ width: '85%', }}>
                    <ColorPicker
                        color={prevColor}
                        onColorChange={color => setColorLed(color)}
                        // onColorChange={
                        //     isColorLedChanged ?
                        //         color => setColorLed(color)
                        //         : color => changeColor(color)
                        // }
                        // onColorChangeComplete={isChanged ? color => setColorLed(color) : color => changeColor(color)}
                        swatches={false}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={false}
                        row={false}
                    />
                </View>
            </View>

            <View style={styles.colorLedOptions}>

                <View style={[styles.showColor, { backgroundColor: colorLed != '' ? colorLed : prevColor }]}>
                    <Text>{textColor}</Text>
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

                <Slider
                    style={{ width: '85%', height: 50 }}
                    minimumValue={0}
                    maximumValue={255}
                    value={prevWhite}
                    // onValueChange={
                    //     isWhiteLedChanged ?
                    //         valor => setWhiteLed(Math.round(valor))
                    //         : valor => changeWhite(valor)
                    // }
                    onValueChange={valor => setWhiteLed(Math.round(valor))}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />

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
    colorLedPick: {
        flex: 3,
        alignItems: 'center',
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

    // whiteLedOptions: {
    //     flex: 2,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

    showColor: {
        flex: 1,
        margin: 15,
        borderWidth: 4,
        borderRadius: 20,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    switchColor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },


})
