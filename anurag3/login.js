let checkedCount = 0;  // Variable to keep track of how many tasks are completed

function validate() {
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;

    if (user === "admin" && pass === "12345") {
        console.log(user);
        return true;
    } else {
        alert("Invalid username or password");
        return false;
    }
}

function change() {
    console.log("Button clicked");

    // Step 1: Create a new XMLHttpRequest object
    var xhttp = new XMLHttpRequest();

    // Step 2: Open a connection to the API
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);

    // Step 3: Send the request
    xhttp.send();

    // Step 4: Handle the response when it's ready
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);  // Log the raw JSON response

            var data = JSON.parse(this.response);  // Parse the response

            let output = '<table class="table table-bordered"><thead><tr><th>Title</th><th>Status</th></tr></thead><tbody>';

            // Loop through the data and create table rows
            for (let i = 0; i < data.length; i++) {
                output += `
                    <tr>
                        <td>${data[i].title}</td>
                        <td>
                            <input 
                                type="checkbox" 
                                ${data[i].completed ? 'checked' : ''} 
                                ${data[i].completed ? 'disabled' : ''} 
                                onclick="toggleStatus(${data[i].id}, this)">
                        </td>
                    </tr>
                `;
            }

            output += '</tbody></table>';  // Close the table tags

            // Insert the table into the DOM
            document.getElementById('todo-table').innerHTML = output;
        }
    };
}

// Function to handle checkbox click and toggle the task completion status
function toggleStatus(id, checkbox) {
    // Check if the checkbox is checked or unchecked
    if (checkbox.checked) {
        checkedCount++; // Increment counter when checked
    } else {
        checkedCount--; // Decrement counter when unchecked
    }

    // Print the updated count to the console for debugging
    console.log(`Completed tasks: ${checkedCount}`);

    // Check if the user has completed 5 tasks
    if (checkedCount === 5) {
        alert("Congratulations! You have completed 5 tasks.");
    }
}