

 
 
 $(document).ready(function() {
    // Twitch API credentials
    const clientId = 'plobcic806ylkgejlsll5skn8swl6y';
    const oauthToken = 'nagi6iz9qlcii5n3xxq9hnolxgsweu'; // Replace with a valid OAuth token
    const channelName = 'filipoagusto';
    
    // Function to check if the stream is live
    function checkStreamStatus() {
        $.ajax({
            type: 'GET',
            url: `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${oauthToken}` // Correct way to include the OAuth token
            },
            success: function(response) {
                if (response.data && response.data.length > 0) {
                    // Stream is live
                    $('.window-text p').hide();  // Hide <p> tags
                    $('iframe').show();          // Show iframe
                } else {
                    // Stream is offline
                    $('.window-text p').show();  // Show <p> tags
                    $('iframe').hide();          // Hide iframe
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching stream status:', status, error);
            }
        });
    }

    // Initially hide the iframe
    $('iframe').hide();
    
    // Check stream status on page load
    checkStreamStatus();
});
