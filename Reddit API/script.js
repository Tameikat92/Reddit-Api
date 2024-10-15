const awwButton = document.getElementById('aww-button');
const awwDiv = document.getElementById('aww-results');
const awwParagraph = document.getElementById('aww-stuff');

awwButton.addEventListener('click', function() {
    
    const url = 'https://www.reddit.com/r/aww/.json';

    fetch(url)
    .then(response => response.json())
    .then(redditData => {
        // Reddit data contains all the data in this JSON API
        const posts = redditData.data.children;

        // Loop through each post object to display images, links, divs, etc.
        posts.forEach(post => {
            const postData = post.data; // Access the data object inside the post

            // Create HTML elements to display the post
            const postDiv = document.createElement('div');
            const postTitle = document.createElement('h2');
            const postImage = document.createElement('img');
            const postLink = document.createElement('a');

            // Set the content and attributes for each HTML element
            postTitle.textContent = postData.title; // Set the title of the post
            postImage.src = postData.thumbnail !== "self" ? postData.thumbnail : ""; // Use the thumbnail if available
            postLink.href = `https://www.reddit.com${postData.permalink}`; // Link to the full post
            postLink.textContent = "View Post"; // Text for the link

            // Add the title, image, and link elements to the post container
            postDiv.appendChild(postTitle);
            if (postData.thumbnail && postData.thumbnail !== 'self') {
                postDiv.appendChild(postImage); // Only add the image if it exists
            }
            postDiv.appendChild(postLink);

            // Append the postDiv to the main container (awwDiv) inside the loop
            awwDiv.appendChild(postDiv);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error); // Log any errors
    });
});
