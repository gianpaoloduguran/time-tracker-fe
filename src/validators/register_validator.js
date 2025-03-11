
//This component validates the User inputs from the Register Component
export const validate = ({ email, password, confirmPassword, fullName }) => {
    if (email !== "") { // validate email
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

        }
        else {
            return { validate: false, message: "Invalid Email Format" };
        }
    }
    else {
        return { validate: false, message: "Email can not be empty" };
    }

    if (password == "" || confirmPassword == "") { // validate password
        return { validate: false, message: "Password and Confirm Password cannot be empty" };
    }
    else if (password.length < 5 || confirmPassword.length < 5) {
        return { validate: false, message: "Password should at least contain 5 characters" };
    }
    else if (password !== confirmPassword) {
        return { validate: false, message: "Password and Confirm Password are not equal " };
    }

    return { validate: true, message: "" };
};