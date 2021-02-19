import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
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

    useEffect(() => {
        if (colorLed != '') {
            // console.log(colorLed);
            console.log(hexToRGBTrama(colorLed));
            setTextColor(colorLed);
        } else {
            // picker.current.setColor(prevColor);
            setTextColor(prevColor);
        }
    }, [colorLed]);

    useEffect(() => {
        if (whiteLed) {
            console.log(whiteLed);
        }
    }, [whiteLed])

    return (
        <View style={{ width: '100%', height: '100%' }}>

            <View style={styles.colorLedPick}>
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

            <View style={styles.colorLedOptions}>

                <View style={[styles.showColor, { backgroundColor: colorLed != '' ? colorLed : prevColor }]}>
                    <Text>{textColor}</Text>
                </View>

                <View style={styles.switchColor}>
                </View>

            </View>

            <View style={styles.whiteLed}>

                <Slider
                    style={{ width: '90%', height: 50 }}
                    minimumValue={0}
                    maximumValue={255}
                    onValueChange={(valor) => {
                        setWhiteLed(Math.round(valor));
                    }}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />

            </View>

            <View style={styles.whiteLedOptions}>

            </View>

            {/* <View>
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
            <View style={{ height: 50, width: 200, backgroundColor: colorLed != '' ? colorLed : prevColor }}>
                <Text>{textColor}</Text>
            </View>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={255}
                onValueChange={(valor) => {
                    setWhiteLed(Math.round(valor));
                }}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            /> */}

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
        flex: 5,
        backgroundColor: 'lightblue',
    },

    colorLedOptions: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: 'lightgreen',
    },

    whiteLed: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
    },

    whiteLedOptions: {
        flex: 2,
        backgroundColor: 'lightyellow',
    },

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
    },


})
