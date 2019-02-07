// LOAD DATA

var friends = require('../data/friends.js');

// ROUTING

module.exports = function(app){

	// API GET Requests

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	// API POST Requests

	app.post('/api/friends', function(req, res){

		
		// We will use this object to hold the "best match". We will constantly update it as we loop through all of the options 
		var bestMatch = {
			name: "",
			friendDifference: 1000
		};

		// Here we take the result of the user's survey POST and parse it.
		var userData 	= req.body;
		var userScores 	= userData.scores;

		// calculate the difference between the user's scores and the scores of each user in the database
		var totalDifference = 0;

		// Here we loop through all the friend possibilities in the database. 
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// We then loop through all the scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If the sum of differences is less than the differences of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		// Finally save the user's data to the database 
		friends.push(userData);

		// Return a JSON with the user's bestMatch.  
		res.json(bestMatch);

	});

}