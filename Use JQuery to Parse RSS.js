//Import jQuery Library from the CDN, you don't even need to download it!
app.importScript("https://code.jquery.com/jquery-3.3.1.js");

(function () {

    //Specify the RSS Feed Link
    const rssFeed = "http://forums.quark.com/feed.php";
    //Check the feed to know which Tag is used for each entry, specify the correct Tag here
    const rssPostTag = "entry";
    //Create an array of Article Tags you want to fetch from the feed
    const keysToRead = ["title", "author", "id"];

    //Call the function to read the feed
    readRSS();

    //*****************====================================Functions used in the JavaScript===============================****************//
    
    function readRSS() {
        let articleList = []; //Create an array to store articles
        let article; //variable to store each article
        let promise = new Promise(function (resolve, reject)//promise is used to ensure this task completes and return a promise followed by further execution
        {
            //Load the RSS Feed XML using JQuery's "get" method
            $.get(rssFeed, function (data) {
                $(data).find(rssPostTag).each(function () {
                    var el = $(this);
                    //Create an object to store articles
                    article = new Object();
                    //Loop through all required Tags are store them in the object
                    for (let i = 0; i < keysToRead.length; i++) {
                        article[keysToRead[i]] = el.find(keysToRead[i]).text();
                    }

                    //Push to the list
                    articleList.push(article);
                    //Print the Element on the JavaScript Debugger console
                    console.log(article);
                });

                console.log("Found " + articleList.length + " articles in the feed.");
            });

            // resolve(articleList);
            Promise.resolve().then(resolve(articleList));
        });
        return promise;
    }

})();
