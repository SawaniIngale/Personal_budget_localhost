function validation(values){
    // alert("")
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const pwd_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name===""){
        error.name ="Please enter Name"
    }
    else{
        error.name = ""
    }

    if(values.email===""){
        error.email ="Please enter email id"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email Id not found. Try again"
    }
    else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Please enter password"
    }
    else if(!pwd_pattern.test(values.password)){
        error.password = "Enter correct password"
    }
    else{
        error.password = ""
    }
    return error;
}

export default validation;