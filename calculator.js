document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("flowCalculator");
    const results = document.getElementById("results");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const lastPeriodValue = document.getElementById("lastPeriod").value;
        const cycleLength = Number(document.getElementById("cycleLength").value);
        const flowDuration = Number(document.getElementById("flowDuration").value);

        if (!lastPeriodValue) {
            alert("Please select your last period date.");
            return;
        }

        if (cycleLength < 20 || cycleLength > 45) {
            alert("Cycle length must be between 20 and 45 days.");
            return;
        }

        if (flowDuration < 2 || flowDuration > 10) {
            alert("Flow duration must be between 2 and 10 days.");
            return;
        }

        const lastPeriod = new Date(lastPeriodValue);

        const nextPeriod = new Date(lastPeriod);
        nextPeriod.setDate(lastPeriod.getDate() + cycleLength);

        const menstrualEnd = new Date(lastPeriod);
        menstrualEnd.setDate(lastPeriod.getDate() + flowDuration - 1);

        const follicularStart = new Date(menstrualEnd);
        follicularStart.setDate(menstrualEnd.getDate() + 1);

        const ovulationStart = new Date(lastPeriod);
        ovulationStart.setDate(lastPeriod.getDate() + (cycleLength - 14));

        const lutealStart = new Date(ovulationStart);
        lutealStart.setDate(ovulationStart.getDate() + 1);

        const formatDate = (date) =>
            date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
            });

        results.innerHTML = `
            <h3>Your Cycle Overview</h3>
            <div class="cards">
                <div class="card"><strong>Next Period:</strong><br>${formatDate(nextPeriod)}</div>
                <div class="card"><strong>Menstrual Phase:</strong><br>${formatDate(lastPeriod)} – ${formatDate(menstrualEnd)}</div>
                <div class="card"><strong>Follicular Phase:</strong><br>${formatDate(follicularStart)}</div>
                <div class="card"><strong>Ovulation Phase:</strong><br>${formatDate(ovulationStart)}</div>
                <div class="card"><strong>Luteal Phase:</strong><br>${formatDate(lutealStart)}</div>
            </div>
        `;

        // Show alert to notify user that calculation is complete
        alert("Your cycle calculation is complete! Check the results below.");
    });
});
