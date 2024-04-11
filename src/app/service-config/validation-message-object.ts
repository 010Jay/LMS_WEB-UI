export class ValidationMessage {
    shortTextMaxLength: string = "should not be more than 10 characters long!";
    longTextMaxLength: string = "should not be more than 25 characters long!";
    requiredField: string = "is required!";
    usernameLength: string = "Username should contain minimun of 4 characters and a maximun of 10 characters!";
    usernameTaken: string = "Username already exist. Please choose another!"
    passwordPattern: string = "Password should have minimum 8 characters, at least 1 uppercase letter," + 
                              " 1 lowercase letter and 1 number!";
    contactNumberLength: string = "should not be more than 10 digits long!";
    emailAddressValidation: string = "Please enter a valid email!";                          
}