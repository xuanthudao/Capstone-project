/*document.getElementById('post-input').addEventListener('keydown', copyToDiv);

function copyToDiv() {
    document.getElementById("post-feed-inner").innerHTML = document.getElementById("post-input").value;
}*/
function copyToDiv() {
    let input = document.getElementById('post-input').value;
    document.getElementById('post-feed-inner').innerHTML = input;
}
