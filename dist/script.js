var data = {
  bill: 0,
  tip: 0,
  person: 0,
  tipTotal: 0,
  totalPerPerson: 0,
};

// button group
const buttonGroup = document.getElementById("button-group");

buttonGroup.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === "A";
  if (!isButton) {
    return;
  }
  var tipValue = e.target.id;
  resetActiveSelect(tipValue);

  switch (tipValue) {
    case "tip-1":
      tipValue = 5;
      break;
    case "tip-2":
      tipValue = 10;
      break;
    case "tip-3":
      tipValue = 15;
      break;
    case "tip-4":
      tipValue = 25;
      break;
    case "tip-5":
      tipValue = 50;
      break;
    case "custom":
      break;
    default:
      tipValue = 0;
      break;
  }

  if (document.getElementById("customInput") !== null) {
    document.getElementById("customInput").style.backgroundColor =
      "hsl(202, 50%, 97%)";
    document.getElementById("customInput").style.color = "hsl(183, 100%, 15%)";
  } else {
    data.tip = tipValue;

    calcTip();
  }
});

// custom button
const custom = document.getElementById("custom");
let inputCreated = false;

custom.addEventListener("click", (e) => {
  let targetElement = e.target;

  do {
    if (targetElement == custom) {
      handleCustomInput();
      return;
    }

    targetElement = targetElement.parentNode;
  } while (targetElement);
});

function resetActiveSelect(x) {
  Array.from(document.getElementById("button-group").children).map((x) => {
    x.style.backgroundColor = "hsl(183, 100%, 15%)";
  });
  document.getElementById(x).style.backgroundColor = "hsl(172, 67%, 45%)";
  document.getElementById("button-group").children[5].style.backgroundColor =
    "hsl(202, 50%, 97%)";
}

function handleCustomInput() {
  if (!inputCreated) {
    custom.innerHTML = "";

    var newInput = document.createElement("INPUT");
    newInput.id = "customInput";
    newInput.setAttribute("onblur", "handleSubmit()");
    custom.appendChild(newInput);
    document.getElementById("customInput").focus();

    inputCreated = true;
  } else return;
}

function handleSubmit() {
  var inputValue = document.getElementById("customInput").value;
  validateTip(inputValue);
}

function currencyFormatter(x) {
  // Create our number formatter.
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(x); /* $2,500.00 */
}

function validateTip(x) {
  if (x == 0 || !parseFloat(x * 1)) {
    document.getElementById("customInput").remove();
    document.getElementById("custom").innerText = "Custom";
    inputCreated = false;
  } else {
    tipValue = document.getElementById("customInput").value;
    tipValue * 1.0;
    document.getElementById("customInput").style.backgroundColor =
      "hsl(172, 67%, 45%)";
    document.getElementById("customInput").style.borderRadius = "5px";
    document.getElementById("customInput").style.color = "white";
    document.getElementById("customInput").value =
      currencyFormatter(tipValue); /* $2,500.00 */

    data.tip = tipValue * 1;
    console.log(data.tip);

    calcTip();
  }
}

function validateBill() {
  data.bill = bill.value * 1;
  calcTip();
}

function validatePersonCount() {
  var person = document.getElementById("person").value * 1;

  if (person !== parseInt(person, 10)) {
    var errorText = document.createElement("P");
    errorText.innerHTML = "Have to be an integer";
    errorText.classList.add("error");
    document.querySelector(".left .row:nth-child(3)").appendChild(errorText);
    document.querySelector(".left .row:nth-child(3)").appendChild(errorText);
    document.getElementById("person").style.border =
      "2px solid hsl(19, 100%, 50%)";
    document.getElementById("person").style.borderRadius = "5px";
    setTimeout(() => {
      errorText.remove();
      document.getElementById("person").value = "";
      document.getElementById("person").focus();
      document.getElementById("person").style.border = "none";
    }, 900);
  } else if (person === 0) {
    var errorText = document.createElement("P");
    errorText.innerHTML = "Can't be a zero";
    errorText.classList.add("error");
    document.querySelector(".left .row:nth-child(3)").appendChild(errorText);
    document.querySelector(".left .row:nth-child(3)").appendChild(errorText);
    document.getElementById("person").style.border =
      "2px solid hsl(19, 100%, 50%)";
    document.getElementById("person").style.borderRadius = "5px";

    setTimeout(() => {
      errorText.remove();
      document.getElementById("person").value = "";
      document.getElementById("person").focus();
      document.getElementById("person").style.border = "none";
    }, 900);
  } else {
    data.person = person;

    calcTip();
  }
}

function calcTip() {
    data.tipTotal = (data.bill * (data.tip / 100)) / data.person;
    data.totalPerPerson = data.bill / data.person + data.tipTotal;

  if (
    isFinite(data.bill) !== 0 &&
    isFinite(data.tip) !== 0 &&
    isFinite(data.person) !== 0
  ) {
        document.querySelector("#tipTotal > h1").innerHTML = currencyFormatter(
        data.tipTotal
        );
        document.querySelector("#totalPerPerson > h1").innerHTML =
        currencyFormatter(data.totalPerPerson);
    }
}
