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


    // const picker = useRef();

    const [colorLed, setColorLed] = useState('');
    const [textColor, setTextColor] = useState('');
    const [whiteLed, setWhiteLed] = useState('');
    const [isActivedSwitch1, setIsActivedSwitch1] = useState(false);
    const [isActivedSwitch2, setIsActivedSwitch2] = useState(false);

    useEffect(() => {
        if (colorLed != '') {
            console.log(hexToRGBTrama(colorLed));
            setTextColor(colorLed);
        } else {
            setTextColor(prevColor);
        }
    }, [colorLed]);

    useEffect(() => {
        if (whiteLed) {
            console.log(whiteLed);
        }
    }, [whiteLed])

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'lightgrey' }}>

            <View style={styles.colorLedPick}>
                <View style={{ width: '85%', }}>
                    <ColorPicker
                        color={prevColor}
                        onColorChange={(color => setColorLed(color))}
                        // onColorChangeComplete={(color => setColorLed(color))}
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
                        thumbColor={isActivedSwitch1 ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setIsActivedSwitch1(previousState => !previousState)}
                        value={isActivedSwitch1}
                    />
                </View>

            </View>

            <View style={styles.whiteLed}>

                <Slider
                    style={{ width: '85%', height: 50 }}
                    minimumValue={0}
                    maximumValue={255}
                    onValueChange={(valor) => {
                        setWhiteLed(Math.round(valor));
                    }}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />

                <Switch
                    style={{ height: 50, width: 50 }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isActivedSwitch2 ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsActivedSwitch2(previousState => !previousState)}
                    value={isActivedSwitch2}
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
