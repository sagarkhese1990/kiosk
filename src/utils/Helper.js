
export const Helper = {
    isNull,
    isUndefined,
    isValidEmail,   
    isNumber,   
    isValidPhoneNumber
};
function isNull(value) {
    if (value === "" || value === " " || value === undefined) {
        return true;
    } else {
        return false;
    }
}
function isUndefined(value) {
    if (value === "" || value === undefined || value === null || value === 'undefined') {
        return true;
    } else {
        return false;
    }
}
function isValidPhoneNumber(value) {
    let phoneno =  /^\d{10}$/;
    console.log(value.match(phoneno));
    if (value.match(phoneno)) {
        console.log(value);
        return false;
    } else {
        console.log('true', value);
        return true;
    }
}
function isValidEmail(text) {
    // let reg = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,10})+$/;
    let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/
    if (reg.test(text) === false) {
        return false;
    } else {
        return true;
    }
}

function isNumber(number) {
    let reg = /^[0-9\b]+$/;
    if (reg.test(number) === false) {
        return false;
    } else {
        return true;
    }
}

