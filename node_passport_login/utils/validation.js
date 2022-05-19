const validator = require("validator")
const validateForm=(data)=>{
    const errors = {};
    let keysArray = Object.keys(data);
    keysArray.forEach(key=>{
        if(`${data[key]}` == '' || `${data[key]}` == undefined){
            errors[key] = `Invalid ${key.split("_").length > 1 ? [...key.split("_")].join(' ') : key }`
        }
        if(key == 'username' || key == 'email' || key == 'emailAddress'){
            if(!validator.isEmail(`${data[key]}`)){
                errors[key] = `Invalid ${key}`
            }
        }

    })

    return errors;
}

module.exports = validateForm
