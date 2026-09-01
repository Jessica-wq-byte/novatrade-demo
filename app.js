const state = {
  balance: 10000,
  profit: 0,
  commission: 0,
  referrals: 0,
  invested: 0
};


function money(value) {

  return "$" + Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

}


function render() {

  const balance = document.getElementById("balance");
  const profit = document.getElementById("profit");
  const commission = document.getElementById("commission");
  const referrals = document.getElementById("referrals");


  if (balance) {
    balance.textContent = money(state.balance);
  }


  if (profit) {
    profit.textContent = money(state.profit);
  }


  if (commission) {
    commission.textContent = money(state.commission);
  }


  if (referrals) {
    referrals.textContent = state.referrals;
  }

}


function addActivity(title, amount) {

  const activity = document.getElementById("activity");

  if (!activity) return;


  const empty = activity.querySelector(".empty");

  if (empty) {
    empty.remove();
  }


  const row = document.createElement("div");

  row.className = "event";


  const titleElement = document.createElement("span");

  titleElement.textContent = title;


  const amountElement = document.createElement("b");

  amountElement.textContent = amount;


  row.appendChild(titleElement);

  row.appendChild(amountElement);

  activity.prepend(row);

}


function invest(amount) {

  if (state.balance < amount) {

    alert("Not enough virtual funds.");

    return;

  }


  state.balance -= amount;

  state.invested += amount;


  addActivity(
    "Demo investment",
    "-" + money(amount)
  );


  render();

}


function simulateHour() {

  if (state.invested <= 0) {
    return;
  }


  const rate = 0.0015;

  const gain = state.invested * rate;


  state.profit += gain;

  state.balance += gain;


  addActivity(
    "Simulated hourly return",
    "+" + money(gain)
  );


  render();

}


function copyRef() {

  const code = document.getElementById("refcode");

  if (!code) return;


  const text = code.textContent.trim();


  if (navigator.clipboard) {

    navigator.clipboard.writeText(text)

      .then(function () {

        addActivity(
          "Referral code copied",
          "Demo"
        );

      })

      .catch(function () {

        alert(
          "Referral code: " + text
        );

      });

  } else {

    alert(
      "Referral code: " + text
    );

  }

}


document.addEventListener(
  "DOMContentLoaded",
  function () {

    render();

  }
);


// Demo simulation only.
// Runs every 10 seconds for testing.

setInterval(
  simulateHour,
  10000
);
