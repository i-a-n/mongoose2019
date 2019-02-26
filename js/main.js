// click listener
$(document).ready( function() {
  if (localStorage.getItem('alreadyRSVPd')) {
    $(".messageDiv").html("RSVP Received. See you there!").removeClass('messageDiv--hide');
    $(".formFields").hide();
  }
    $("#submitForm").click( function() {
        $(".messageDiv").addClass("messageDiv--hide");

        // check form (html5 only does validation if you hit enter on the form)
        if( $("form#rsvpForm")[0].checkValidity() ) {
            $("form#rsvpForm").submit();
        }
        else {
            $(".messageDiv").html("Please fill out all fields").removeClass("messageDiv--hide");
        }
    });

    $("#donateLink").click( function() {
      window.location.href = 'https://www.weareplannedparenthood.org/onlineactions/2U7UN1iNhESWUfDs4gDPNg2?t=true&ttype=2&r=false';
    });
});

// submit action
$("#rsvpForm").submit( function(e) {
    e.preventDefault();

    var formData = $(this).serializeArray();
    var returnArray = {};
    for (var i = 0; i < formData.length; i++){
      returnArray[formData[i]['name']] = formData[i]['value'];
    }

    // show message within button and hide old status message, if any
    $(".messageDiv").addClass("messageDiv--hide");
    $(".ctaMessage--2").show();
    $("input").prop("disabled","disabled");

    // call function
    rsvp(returnArray);
    // dummy();
});

function dummy() {
  setTimeout(function() {
    // $("#submitForm").hide();
    // $(".ctaMessage--2").slideUp();
    $(".messageDiv").html("RSVP Received. See you there!").removeClass('messageDiv--hide');
    $(".formFields").slideUp();
    localStorage.setItem('alreadyRSVPd', true);
    // $("input").prop("disabled",false).val('');
  }, 1200);
}

// rsvp adding
function rsvp(formData) {
  var rsvpRef = firebase.database().ref();
  var newRSVPRef = rsvpRef.push();
  newRSVPRef.set(formData)
  .then(function() {
    console.log('RSVP succeeded');
    $(".messageDiv").html("RSVP Received. See you there!").removeClass('messageDiv--hide');
    $(".formFields").slideUp();
    localStorage.setItem('alreadyRSVPd', true);
  })
  .catch(function(error) {
    console.log('RSVP failed');
    $(".ctaMessage--2").slideUp();
    $(".messageDiv").html("Error: Please try again, or email us.").removeClass('messageDiv--hide');
    $("input").prop("disabled",false);
  });
}
