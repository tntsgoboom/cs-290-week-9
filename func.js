var nameField = document.getElementById('name');
var insertButton = document.getElementById('insert');
var champList = document.getElementById('champList');
var form = document.getElementById('askSummoner');

form.onkeypress = function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    return false;
  }
};

if(insertButton) {
insertButton.onclick=function() {
    var name = nameField.value;
    if (name == null || name == "") {
	alert("You must fill in the summoner name.");
	return false;
    }
    
    var reqSumId = new XMLHttpRequest();
    reqSumId.open('GET', 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'+name+'?api_key=7fcfe5d9-87f7-4333-b00a-004b847df68b', true);
    reqSumId.addEventListener('load',function(){
      if(reqSumId.status >= 200 && reqSumId.status < 400) {
	var response = JSON.parse(reqSumId.responseText);
	name = name.toLowerCase();
	var sumId = response[""+name].id;

	console.log(sumId);

	var reqRG = new XMLHttpRequest();
	reqRG.open('GET', 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+sumId+'/recent?api_key=7fcfe5d9-87f7-4333-b00a-004b847df68b', true);
	reqRG.addEventListener('load', function() {
	  if(reqRG.status >= 200 && reqRG.status < 400) {
	    var response = JSON.parse(reqRG.responseText);
	    
	    var champId = {};
	    var reqChamp = {};
	    for(var i = 0; i < 10; i++) {
	      champId[i] = response.games[i].championId;
	      console.log(champId[i]);



	      reqChamp[i] = new XMLHttpRequest();
	      reqChamp[i].order = i;
	      reqChamp[i].open('GET', 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+champId[i]+'?api_key=7fcfe5d9-87f7-4333-b00a-004b847df68b', true);
	      reqChamp[i].addEventListener('load', function() {
		if(this.status >= 200 && this.status < 400) {
		  var response = JSON.parse(this.responseText);

		  console.log(this.order);
		  console.log(response.name);

		  champList.children[this.order].innerHTML = response.name;
		  champList.children[this.order].style.visibility = "visible";

		} else {
		  console.log("Error in network request: " + request.statusText);
		}
	      });
	      reqChamp[i].send();
	    }


          } else {
            console.log("Error in network request: " + request.statusText);
          }
	});
	reqRG.send();


      } else {
        console.log("Error in network request: " + request.statusText);
      }
    });
    reqSumId.send();
}
}

