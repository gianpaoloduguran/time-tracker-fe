export const validate = ({ email, password }) => {
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
    if (password == "") { // validate password
        return { validate: false, message: "Password  cannot be empty" };
    }

    return { validate: true, message: "" };
};