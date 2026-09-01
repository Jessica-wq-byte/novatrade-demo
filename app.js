let state={balance:10000,profit:0,commission:0,referrals:0,invested:0};
const money=n=>"$"+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
function render(){balance.textContent=money(state.balance);profit.textContent=money(state.profit);commission.textContent=money(state.commission);referrals.textContent=state.referrals;heroBalance.textContent=money(state.balance)}
function addActivity(title,amount){let box=document.getElementById("activity");if(box.querySelector(".empty"))box.innerHTML="";let row=document.createElement("div");row.className="event";row.innerHTML=`<span>${title}</span><b>${amount}</b>`;box.prepend(row)}
function invest(amount){if(state.balance<amount){alert("Not enough virtual funds.");return}state.balance-=amount;state.invested+=amount;addActivity("Demo investment",money(amount));render()}
function simulateHour(){if(!state.invested)return;let rate=.0015;let gain=state.invested*rate;state.profit+=gain;state.balance+=gain;addActivity("Simulated hourly return","+"+money(gain));render()}
function openDemo(){document.getElementById("dashboard").scrollIntoView({behavior:"smooth"})}
function copyRef(){navigator.clipboard?.writeText(refcode.textContent);addActivity("Referral code copied","Demo")}
render();
// For a safe demo, one simulated update occurs every 10 seconds rather than claiming real hourly earnings.
setInterval(simulateHour,10000);