$(document).ready(function () {

    (function ($) {
        "use strict";


        jQuery.validator.addMethod('answercheck', function (value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value)
        }, "type the correct answer -_-");

        // validate contactForm form
        $(function () {
            $('#contactForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    subject: {
                        required: true,
                        minlength: 4
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 20
                    }
                },
                messages: {
                    name: {
                        required: "come on, you have a name, don't you?",
                        minlength: "your name must consist of at least 2 characters"
                    },
                    subject: {
                        required: "come on, you have a web address, don't you?",
                        minlength: "your address must consist of at least 4 characters"
                    },
                    email: {
                        required: "no email, no message"
                    },
                    message: {
                        required: "um...yea, you have to write something to send this form.",
                        minlength: "thats all? really?"
                    }
                },
                submitHandler: function (form) {
                    const body = `<html>
                                <body>
                                Hi<br/>
                                You are contacted from ${$('#name')[0].value} (${$('#email')[0].value}).<br/>
                                Details:<br/>
                                Subject: ${$('#subject')[0].value}<br/>
                                Message: ${$('#message')[0].value}<br/>
                                </body>
                                </html>`
                    Email.send({
                        SecureToken: "4ece5793-85b8-4db8-9720-bf4d7f1788ea",
                        To: 'pratikmmaniya244@gmail.com',
                        From: "pratiksocial2@gmail.com",
                        Subject: `Contact request from ${$('#name')[0].value} with pratikmaniya.github.io`,
                        Body: body,
                    }).then(message => {
                        console.log(message)
                        if (message === 'OK') {
                            $('#contactForm :input').attr('disabled', 'disabled');
                            $('#contactForm').fadeTo("slow", 0.15, function () {
                                $(this).find(':input').attr('disabled', 'disabled');
                                $(this).find('label').css('cursor', 'default');
                                $('#success').fadeIn()
                            })
                        } else {
                            $('#contactForm').fadeTo("slow", 0.15, function () {
                                $('#error').fadeIn()
                            })
                        }
                    })
                }
            })
        })

    })(jQuery)
})