
const custom = document.getElementById('custom');
let inputCreated = false;

custom.addEventListener('click', (e) => {
    let targetElement = e.target;

    do {
        if(targetElement == custom) {
            handleCustomInput();
            return;
        }

        targetElement = targetElement.parentNode;
    } while (targetElement);

    alert('clicked outside');
})

function handleCustomInput() {
    if(!inputCreated) {
        custom.innerHTML = "";

        var newInput = document.createElement("INPUT");
        newInput.id = "customInput";
        newInput.setAttribute("onblur","handleSubmit()");
        custom.appendChild(newInput);
        document.getElementById('customInput').focus();

        inputCreated = true;
    } else return;
}

function handleSubmit() {
    var inputValue = document.getElementById('customInput').value;
    getValidation(inputValue);
}

function getValidation(x) {
    if(x == 0) {
        console.log('non-zero');
        document.getElementById('customInput').value = 0;
        document.getElementById('customInput').focus();
    } else return;
}