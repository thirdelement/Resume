function sendMail (contactForm){  //We are passing in the form as a parameter
    emailjs.send("BreakDaBank.buzz","Rosie", {    //1st argument - service ID; 2nd argument: templateID; 3rd argument is an object
                                                    //containing the parameters which are all equal to what is set in emailJS
        "from_name": contactForm.name.value, 
        "from_email": contactForm.emailaddress.value, 
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response)   //If sending email is a success then we're going to console.log SUCCESS and 
                                                //the response object
        }, 
        function(error) {
            console.log("FAILED", error);  //If error we console.log ERROR and error object
        }
    )
return false;  //This prevents the page from refreshing when you submit your form.
}