// click listener
$(document).ready( function() {
    $("#submitForm").click( function() {
        $(".messageDiv").addClass("messageDiv--hide");

        // check form (html5 only does validation if you hit enter on the form)
        if( $("form#emailForm")[0].checkValidity() ) {
            $("form#emailForm").submit();
        }
        else {
            $(".messageDiv").html("Please enter a valid email address").removeClass("messageDiv--hide");
        }
    });
});

// submit action
$("#emailForm").submit( function(e) {
    e.preventDefault();
    var emailAddress = $("#emailInput").val();

    // show message within button and hide old status message, if any
    $(".messageDiv").addClass("messageDiv--hide");
    $(".ctaMessage--2").slideDown();
    $("input").prop("disabled","disabled");

    // call function
    //addContact( "everyone@1910league.com", emailAddress );
    rsvp();
});

// general handler, extensible in case we do unsub later
function ajaxHandler(path,payload) {
    var deferredObject = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: path,
        data: payload
    }).done(function(data) {
            deferredObject.resolve(data);
    }).fail( function(a,b,c) {
        console.log(a+b+c);
        deferredObject.fail();
    }).always(function() {
        //nothing here for now
    });
    return deferredObject.promise();
}

// contact adding
function addContact(mailingList, address) {
    ajaxHandler( "http://union.io/1910/mailgun-api.php", "action=add_member&list="+mailingList+"&address="+address )
        .done( function() {
            $(".ctaMessage--2").slideUp();
            $(".messageDiv").html("Email successfully added").removeClass('messageDiv--hide');
            $("input").prop("disabled",false).val('');
        })
        .fail( function() {
            $(".ctaMessage--2").slideUp();
            $(".messageDiv").html("Error, try again later").removeClass('messageDiv--hide');
            $("input").prop("disabled",false);
        });
}

function rsvp() {
  var rsvpRef = firebase.database().ref();
  var newRSVPRef = rsvpRef.push();
  newRSVPRef.set({
    'foo': 'bar',
    'plusOne': false
  })
  .then(function() {
    console.log('RSVP succeeded');
    $(".ctaMessage--2").slideUp();
    $(".messageDiv").html("Email successfully added").removeClass('messageDiv--hide');
    $("input").prop("disabled",false).val('');
  })
  .catch(function(error) {
    console.log('RSVP failed');
    $(".ctaMessage--2").slideUp();
    $(".messageDiv").html("Error, try again later").removeClass('messageDiv--hide');
    $("input").prop("disabled",false);
  });
}
/* var messageListRef = firebase.database().ref();
var newMessageRef = messageListRef.push();
newMessageRef.set({
  'user_id': 'ada',
  'text': 'The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.'
})
  .then(function() {
    console.log('RSVP succeeded');
  })
  .catch(function(error) {
    console.log('RSVP failed');
  }); */
