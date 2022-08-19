import { showMessage } from "react-native-flash-message";

export const flashMessage = ( title, type ) => {
    showMessage({
        message: title,
        type: type,
        titleStyle: {fontSize: 16, textAlign: 'center'},
        floating: true,
        duration: 1700
    });
}