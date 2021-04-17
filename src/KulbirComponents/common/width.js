import {Dimensions} from 'react-native';

const calculate = Dimensions.get('window')

export const getWidthnHeight = (widthPercent = undefined, heightPercent = undefined) => {

    //console.log('Dimensions: ', calculate);

    const width = Math.ceil(calculate.width)

    const height = Math.ceil(calculate.height)
    //console.log('Ceil: ', height)

    let widthValue = null;

    let heightValue = null;

    if(typeof widthPercent === "number" && typeof heightPercent === "number") {
        widthValue = {width: width * widthPercent/100}
        heightValue = {height: height * heightPercent/100}
        let values = Object.assign({...widthValue}, heightValue)
        //console.log('*******heightPassed: ', values);
        return values;
    } else if(typeof widthPercent === "number" && typeof heightPercent === "undefined"){
        widthValue = {width: width * widthPercent/100}
        //console.log('widthPassed: ', widthValue);
        return widthValue;
    } else if(typeof widthPercent === "undefined" && typeof heightPercent === "number"){
        heightValue = {height: height * heightPercent/100}
        //console.log('widthPassed: ', widthValue);
        return heightValue;
    }

}

export const fontSizeH4 = () => {
    const getWidth = calculate.width;
    let font_Size = null;
    if(getWidth < 360){
        font_Size = {fontSize: 10}
        return font_Size;
    } else {
        font_Size = {fontSize: 13}
        return font_Size;
    }
}

export const fontSizeH3 = () => {
    const getWidth = calculate.width;
    let font_Size = null;
    if(getWidth < 360){
        font_Size = {fontSize: 12}
        return font_Size;
    } else {
        font_Size = {fontSize: 14}
        return font_Size;
    }
}

export const getMarginTop = (percent) => {
    const top = Math.ceil(calculate.height)
    return {marginTop: Math.floor(top * percent/100)}
}

export const getMarginBottom = (percent) => {
    const top = Math.ceil(calculate.height)
    return {marginBottom: Math.floor(top * percent/100)}
}

export const getMarginVertical = (percent) => {
    const top = Math.ceil(calculate.height)
    return {marginVertical: Math.floor(top * percent/100)}
}

export const getMarginLeft = (percent) => {
    const side = Math.ceil(calculate.width)
    return {marginLeft: Math.floor(side * percent/100)}
}

export const getMarginRight = (percent) => {
    const side = Math.ceil(calculate.width)
    return {marginRight: Math.floor(side * percent/100)}
}

export const getMarginHorizontal = (percent) => {
    const side = Math.ceil(calculate.width)
    return {marginHorizontal: Math.floor(side * percent/100)}
}