import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorPicker, ColorPickerRef } from 'react-native-color-picker-light';
import Slider from '@react-native-community/slider';

export default function Slide() {

    const prevTrama = 'R78G63B238W125';

    tramaToColor(prevTrama);

    let prevColor = '#4e3fee';

    const picker = useRef();

    const [colorLed, setColorLed] = useState('');
    const [textColor, setTextColor] = useState('');
    const [whiteLed, setWhiteLed] = useState('');

    useEffect(() => {
        if (colorLed != '') {
            console.log(colorLed);
            console.log(hexToRGBTrama(colorLed));
            setTextColor(colorLed);
        } else {
            picker.current.setColor(prevColor);
            setTextColor(prevColor);
        }
    }, [colorLed]);

    useEffect(() => {
        if (whiteLed) {
            console.log(whiteLed);
        }
    }, [whiteLed])

    return (
        <View>
            <View>
                <ColorPicker
                    ref={picker}
                    type="color"
                    style={{ width: 200, height: 200 }}
                    onColorChange={color => {
                        setColorLed(color);
                    }}
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
            />
        </View>

    )

}

const hexToRGBTrama = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `R${parseInt(result[1], 16)}G${parseInt(result[2], 16)}B${parseInt(result[3], 16)}`;
}

const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


const tramaToColor = (trama) => {

    const indexR = trama.indexOf('R');
    const indexG = trama.indexOf('G');
    const indexB = trama.indexOf('B');
    const indexW = trama.indexOf('W');

    const Red = parseInt(trama.slice(indexR + 1, indexG));
    const Green = parseInt(trama.slice(indexG + 1, indexB));
    const Blue = parseInt(trama.slice(indexB + 1, indexW));
    const White = parseInt(trama.slice(indexW + 1, trama.lenght));

    console.log(rgbToHex(Red, Green, Blue));
}

const styles = StyleSheet.create({

})
