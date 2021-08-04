window.onload = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');

    var raw = JSON.stringify({
        "query": "\n  query AnonymousFeed(\n    $loggedIn: Boolean! = false\n    $first: Int\n    $after: String\n    $ranking: Ranking\n  ) {\n    page: anonymousFeed(first: $first, after: $after, ranking: $ranking) {\n      ...FeedPostConnection\n    }\n  }\n  \n  fragment FeedPostConnection on PostConnection {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        ...FeedPost\n        ...UserPost @include(if: $loggedIn)\n      }\n    }\n  }\n  \n  fragment FeedPost on Post {\n    id\n    title\n    createdAt\n    image\n    readTime\n    source {\n      id\n      name\n      image\n    }\n    permalink\n    numComments\n    numUpvotes\n    commentsPermalink\n    author {\n      name\n      image\n    }\n    featuredComments {\n      id\n      content\n      permalink\n      author {\n        name\n        image\n      }\n    }\n    trending\n  }\n\n  \n  fragment UserPost on Post {\n    read\n    upvoted\n    commented\n    bookmarked\n  }\n\n\n",
        "variables": {
            "first": 21,
            "loggedIn": false,
            "unreadOnly": false
        }
    });

    var requestOptions = {
        mode: 'no-cors',
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch("https://app.daily.dev/api/graphql", requestOptions)
        .then(response => console.log(response.text()))
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        fetch("https://quotes.rest/qod?language=en", requestOptions)
            .then(response => response.json())
            .then((result) => {
                const quote = result['contents']['quotes'][0];
                document.getElementById("quote").innerHTML = `“${quote.quote}”`;
                document.getElementById("author").innerHTML = `~ ${quote.author}`;
            })
            .catch(error => console.log('error', error));
};