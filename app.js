const state = {
  balance: 10000,
  profit: 0,
  commission: 0,
  referrals: 0,
  invested: 0
};

function money(n) {
  return "$" + Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function render() {
  const balanceEl = document.getElementById("balance");
  const profitEl = document.getElementById("profit");
  const commissionEl = document.getElementById("commission");
  const referralsEl = document.getElementById("referrals");
  const heroBalanceEl = document.getElementById("heroBalance");

  if (balanceEl) balanceEl.textContent = money(state.balance);
  if (profitEl) profitEl.textContent = money(state.profit);
  if (commissionEl) commissionEl.textContent = money(state.commission);
  if (referralsEl) referralsEl.textContent = state.referrals;
  if (heroBalanceEl) heroBalanceEl.textContent = money(state.balance);
}

function addActivity(title, amount) {
  const box = document.getElementById("activity");
  if (!box) return;

  const empty = box.querySelector(".empty");
  if (empty) empty.remove();

  const row = document.createElement("div");
  row.className = "event";

  const titleEl = document.createElement("span");
  titleEl.textContent = title;

  const amountEl = document.createElement("b");
  amountEl.textContent = amount;

  row.appendChild(titleEl);
  row.appendChild(amountEl);
  box.prepend(row);
}

function invest(amount) {
  if (state.balance < amount) {
    alert("Not enough virtual funds.");
    return;
  }

  state.balance -= amount;
  state.invested += amount;

  addActivity("Demo investment", money(amount));
  render();
}

function simulateHour() {
  if (state.invested <= 0) return;

  const rate = 0.0015;
  const gain = state.invested * rate;

  state.profit += gain;
  state.balance += gain;

  addActivity("Simulated hourly return", "+" + money(gain));
  render();
}

function openDemo() {
  const dashboard = document.getElementById("dashboard");

  if (dashboard) {
    dashboard.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function copyRef() {
  const code = document.getElementById("refcode");

  if (!code) return;

  navigator.clipboard
    .writeText(code.textContent)
    .then(() => {
      addActivity("Referral code copied", "Demo");
    })
    .catch(() => {
      alert("Referral code: " + code.textContent);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  render();
});

// Demo simulation only.
// Updates every 10 seconds for testing.
setInterval(simulateHour, 10000);
