import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorPicker, ColorPickerRef } from 'react-native-color-picker-light';

export default function Slide() {

    const [colorLed, setColorLed] = useState('');

    useEffect(() => {
        if (colorLed != '') {
            // picker.current.setColor(colorLed);
            console.log(colorLed);
        }
    }, [colorLed])

    // const picker = useRef();
    // console.log(picker);
    // picker.current.setColor('#f0ce78');

    // console.log(picker);

    return (

        <View>
            <ColorPicker
                // ref={picker}
                type="color"
                style={{ width: 200, height: 200 }}
                onColorChange={color => {
                    setColorLed(color);
                }}
            />

            {/* {picker.current.setColor('#b48484')} */}

        </View>


    )

}

const styles = StyleSheet.create({})
