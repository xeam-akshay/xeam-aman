import { Platform } from 'react-native';
export default class Utils {
    static isAndroid() {
        return Platform.OS === 'android';
    }
}
