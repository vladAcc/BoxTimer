import React, {useEffect, useRef, useState} from "react";
import {View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity} from "react-native";

import {LinearGradient} from "expo-linear-gradient";

const MyPiker = ({
    namePiker,
    value,
    onChange,
    height,
    width,
    fontSize,
    textColor = "white",
    startYear,
    endYear,
    markColor = '#1a1a1a',
    markHeight,
    markWidth,
    fadeColor,
    format,
    getNumberFunc
}) => {
    const [numb, setNumb] = useState([]);
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);


    



    useEffect(() => {
        const end = endYear || new Date().getFullYear();
        const start = !startYear || startYear > end ? (end - 100) : startYear;

        const _numb = [...Array(59)].map((_, index) =>   index );
        const _days = [...Array(59)].map((_, index) => index > 8 ?  index + 1 :  (index + 1));
        const _months = [...Array(59)].map((_, index) => index > 8 ?  index + 1 :  (index + 1));
        const _years = [...Array(end - start + 1)].map((_, index) => start + index);
        
        setNumb(_numb)
        setDays(_days);
        setMonths(_months);
        setYears(_years);
    }, []);

    const pickerHeight = Math.round(height || Dimensions.get("window").height / 3.5);
    const pickerWidth = width || "100%";

    const unexpectedDate= new Date(years[0], 0, 1);
    const date = new Date(value || unexpectedDate);

    const dateNumb = value;
    //console.log(date)


    const changeHandle = (type, digit) => {
        switch (type) {
            case "numb":
                date;
                break;
            case "day":
                date.setDate(digit);
                break;
            case "month":
                date.setMonth(digit - 1);
                break;
            case "year":
                date.setFullYear(digit);
                break;
        }

        onChange(date);
    }

    const getOrder = () => {
        return (format || "dd-mm-yyyy").split("-").map((type, index) => {
            switch (type) {
                case "number":
                    return {name: "numb", digits: numb, value: date};
                case "dd":
                    return {name: "day", digits: days, value: date.getDate()};
                case "mm":
                    return {name: "month", digits: months, value: date.getMonth() + 1};
                case "yyyy":
                    return {name: "year", digits: years, value: date.getFullYear()};
                default:
                    console.warn(`Invalid date picker format prop: found "${type}" in ${format}. Please read documentation!`)
                    return {
                        name: ["numb", "day", "month", "year"][index],
                        digits: [numb, days, months, years][index],
                        value: [date, date.getDate(), date.getMonth() + 1, date.getFullYear()][index]
                    };
            }
        })
    }

    return (
        <View style={[styles.picker, {height: pickerHeight, width: pickerWidth}]}>
            {
                getOrder().map((el, index) => {
                    //console.log(el)
                    return (
                        <DateBlock
                            namePiker={namePiker}
                            pichNumberFunc={getNumberFunc}
                            digits={el.digits}
                            value={el.value}
                            onChange={changeHandle}
                            height={pickerHeight}
                            fontSize={fontSize}
                            textColor={textColor}
                            markColor={markColor}
                            markHeight={markHeight}
                            markWidth={markWidth}
                            fadeColor={fadeColor}
                            type={el.name}
                            key={index}
                        />
                    )
                })
            }
        </View>
    );
};

const DateBlock = ({
    namePiker,
    pichNumberFunc,
    value,
    digits,
    type,
    onChange,
    height,
    fontSize = 16,
    textColor,
    markColor,
    markHeight,
    markWidth,
    fadeColor = '#282828'
}) => {
    const dHeight = Math.round(height / 4);

    const mHeight= markHeight || Math.min(dHeight, 65);
    const mWidth = markWidth || "70%";

    const offsets = digits.map((_, index) => index * dHeight)

    const fadeFilled = hex2rgba(fadeColor || "#ffffff", 1);
    const fadeTransparent = hex2rgba(fadeColor || "#ffffff", 0);

    const scrollRef = useRef(null);

    const snapScrollToIndex = (index) => {
        scrollRef?.current?.scrollTo({y: dHeight * index, animated: true})
    }

    useEffect(() => {
        snapScrollToIndex(value - digits[0])
    }, [scrollRef.current])


    //croll------------------------------------------------------------------------------
    const handleMomentumScrollEnd = ({nativeEvent}) => {
        const digit = Math.round(nativeEvent.contentOffset.y / dHeight + digits[0]);
        //console.log(digit)
        onChange(type, digit);
        pichNumberFunc(digit)
    }

    
    return (
        <View style={styles.block}>
            <View
                style={[
                    styles.mark,
                    {
                        top: (height - mHeight) / 2,
                        backgroundColor: markColor || "rgba(0, 0, 0, 0.05)",
                        height: mHeight,
                        width: mWidth,
                    }
                ]}
            />
            <ScrollView
                ref={scrollRef}
                style={styles.scroll}
                snapToOffsets={offsets}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={0}
                onMomentumScrollEnd={handleMomentumScrollEnd}
            >
                {digits.map((value, index) => {
           
                    return (
                        <TouchableOpacity
                            key={index}
                           // onPress={() => {
                               // console.log(value)
                               // onChange(type, digits[index])
                                //snapScrollToIndex(index)
                           // }}
                        >
                            <Text
                                style={[
                                    styles.digit,
                                    {
                                        fontFamily:  'RussoOne_400Regular',
                                        fontSize: fontSize || 22,
                                        color: textColor || "#000000",
                                        marginBottom: (index === digits.length - 1)
                                            ? height / 2 - dHeight / 2
                                            : 0,
                                        marginTop: (index === 0)
                                            ? height / 2 - dHeight / 2
                                            : 0,
                                        lineHeight: dHeight,
                                        height: dHeight,
                                    }
                                ]}
                            >
                                {
                                    namePiker !== 'rounds' 
                                        ?  value > 9 ? value : "0" + value
                                        :  value 
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <LinearGradient
                style={[styles.gradient, {bottom: 0, height: height / 4}]}
                colors={[fadeTransparent, fadeFilled]}
                pointerEvents={"none"}
            />
            <LinearGradient
                style={[styles.gradient, {top: 0, height: height / 4}]}
                colors={[fadeFilled, fadeTransparent]}
                pointerEvents={"none"}
            />
        </View>
    )
};

const hex2rgba = (hex, alpha) => {
    hex = hex.replace("#", "");

    const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}



const styles = StyleSheet.create({
    picker: {
       // flexDirection: "row",
        width: 100,
        //borderWidth: 1,
    },
    block: {
        //flex: 1,
        
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    scroll: {
        width: "100%",
    },
    digit: {
        fontSize: 20,
        textAlign: "center",
    },
    mark: {
        position: "absolute",
        borderRadius: 10,
    },
    gradient: {
        position: "absolute",
        width: "100%",
    }
})




export default  MyPiker;
