var timeout;

timeout = getInterval();
setTimeout(getJobs, timeout);

function getJobs() {

    timeout = getInterval();
    setTimeout(getJobs, timeout);

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()
    request.responseType = 'json';

    request.onreadystatechange = function () {

        var divContainer = document.getElementById("jobs");
        divContainer.innerHTML = "";

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            // EXTRACT VALUE FOR HTML HEADER. 
            // ('Book ID', 'Book Name', 'Category' and 'Price')
            var obProps = ["id", "lastUpdateTime", "status", "outputType", "resultSize", "resource", "linkExpires", "message"];
            var displayProps = ["ID", "Updated", "Status", "Type", "Size", "Link", "Link Expires", "Message"];

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

                        if (this.response[i].status == "success") {
                            cellValue = '<a href="' + cellValue + '" target="_blank">Get Result</a>';
                        }
                        else {
                            cellValue = "";
                        }
                    }
                    else if (obProps[j] == "id") {
                        cellValue = '<a href="/demoapp/jobs/' + cellValue + '">' + cellValue + '</a>';
                    }
                    else if (obProps[j] == "status") {
                        // var cellValue = '<a href="' + cellValue +'">Get Result</a>';
                        if (cellValue == "success") {
                            tabCell.className = "cellSuccess";
                        }
                        else if (cellValue == "error") {
                            tabCell.className = "cellError";
                        }
                        else {
                            tabCell.className = "cellProgress";
                        }
                    }
                    tabCell.innerHTML = cellValue
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            divContainer.appendChild(table);
        }
        else {
            var error = document.createElement("p");
            error.style.color = "red";
            error.style.fontSize = "14pt";
            error.innerText = "Server not found.";
            divContainer.appendChild(error);
        }
    }

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', '/demoapp/jobs', true);
    request.setRequestHeader('accept', 'application/json');
    request.send();
}


function getInterval() {
    var interval = 5000;
    try {
        interval = 1000 * Number(document.getElementById("refreshInterval").value);
    } catch{ }
    console.log(interval);
    return interval;
}

function submitExpressionGet() {

    var outputType = document.getElementById('outputTypeDropDown').value;
    var expression = document.getElementById('expressionInput').value;
    if (expression.length == 0) {
        return;
    }
    var path = '/demoapp/expression/' + (encodeURI(expression)) + '?outputType=' + outputType;


    var request = new XMLHttpRequest()

    //request.responseType = 'json';

    request.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log(this.response);
        }
    }

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', path, true);
    request.setRequestHeader('accept', 'application/json');
    request.send();

}