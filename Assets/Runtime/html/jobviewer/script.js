window.setInterval(function () {
    /// call your function here
    getJobs();
}, 2500);

function getJobs() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()
    request.responseType = 'json';

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var jobsTable = document.getElementById("jobs");

            // EXTRACT VALUE FOR HTML HEADER. 
            // ('Book ID', 'Book Name', 'Category' and 'Price')
            var obProps = ["id",  "lastUpdateTime", "status", "outputType", "resultSize", "resource", "linkExpires", "message"];
            var displayProps = ["ID", "Updated", "Status", "Type", "Size", "Link" , "Link Expires", "Message"];

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < obProps.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = displayProps[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < this.response.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < obProps.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    var cellValue = this.response[i][obProps[j]];

                    if (obProps[j] == "resource") {

                        if(this.response[i].status=="success" ){
                         cellValue = '<a href="' + cellValue +'">Get Result</a>';}
                        else{
                        cellValue = "";
                        }
                    }
                    else if (obProps[j] == "id"){
                        cellValue = '<a href="/jobs/' + cellValue +'">'+cellValue+'</a>';
                    }
                    else if(obProps[j] == "status") {
                       // var cellValue = '<a href="' + cellValue +'">Get Result</a>';
                       if (cellValue=="success")
                       {                       
                        tabCell.className="cellSuccess";
                        }
                        else if(cellValue=="error")
                        {
                            tabCell.className="cellError";
                        }
                        else{
                            tabCell.className="cellProgress";
                        }
                    }
                    tabCell.innerHTML = cellValue
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("jobs");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        }
    }

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://localhost/jobs', true);
    request.setRequestHeader('accept', 'application/json');
    request.send();

}

