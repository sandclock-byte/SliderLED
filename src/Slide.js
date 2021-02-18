import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorPicker, ColorPickerRef } from 'react-native-color-picker-light';

export default function Slide() {

    const prevColor = '#4e3fee';

    const picker = useRef();

    const [colorLed, setColorLed] = useState('');
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
        if (colorLed != '') {
            console.log(colorLed);
            console.log(hexToRGBTrama(colorLed));
            setTextColor(colorLed);
        } else {
            picker.current.setColor(prevColor);
            setTextColor(prevColor);
        }
    }, [colorLed])

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
        </View>

    )

}

const hexToRGBTrama = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `R${parseInt(result[1], 16)}G${parseInt(result[2], 16)}B${parseInt(result[3], 16)}`;
}

const styles = StyleSheet.create({

})
