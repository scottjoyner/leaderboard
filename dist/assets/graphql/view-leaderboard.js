var data = JSON.stringify({
    query: "query MyQuery {\n  profile_user(order_by: {balance: desc}) {\n    walletID\n balance\n    id\n    start\n  }\n}\n",
    variables: {}
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
      let leaderboard = JSON.parse(this.responseText);
      console.log(leaderboard.data.profile_user);
      document.getElementById("leaderboardTable").innerHTML = constructTable(leaderboard.data.profile_user);
    }
  });
  
  xhr.open("POST", "http://134.122.2.178/v1/graphql");
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.send(data);

  function constructTable(profile_users) {
        let tr = '';
        tr += `<thead>`
        for(y in profile_users[0]) {
            console.log(y)
            tr += `<td><strong>${y}</strong></td>`;
        }
        tr += `</thead>`;

      for(x in profile_users) {
          tr += `<tr>`
          for(y in profile_users[x]) {
            tr += `<td>${profile_users[x][y]}</td>`;
          }
          tr += `</tr>`;
      }
      return tr;
  }