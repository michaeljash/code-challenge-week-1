function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax rates and deductions
    const TAX_RATES = [
        { min: 0, max: 24000, rate: 10 },
        { min: 24001, max: 32333, rate: 15 },
        { min: 32334, max: 40467, rate: 20 },
        { min: 40468, max: 48600, rate: 25 },
        { min: 48601, max: Infinity, rate: 30 }
    ];

    const NHIF_RATES = [
        { min: 0, max: 5999, amount: 150 },
        { min: 6000, max: 7999, amount: 300 },
        { min: 8000, max: 11999, amount: 400 },
        { min: 12000, max: 14999, amount: 500 },
        { min: 15000, max: 19999, amount: 600 },
        { min: 20000, max: 24999, amount: 750 },
        { min: 25000, max: 29999, amount: 850 },
        { min: 30000, max: 34999, amount: 900 },
        { min: 35000, max: 39999, amount: 1000 },
        { min: 40000, max: 44999, amount: 1100 },
        { min: 45000, max: 49999, amount: 1200 },
        { min: 50000, max: 59999, amount: 1300 },
        { min: 60000, max: 69999, amount: 1400 },
        { min: 70000, max: 79999, amount: 1500 },
        { min: 80000, max: 89999, amount: 1600 },
        { min: 90000, max: 99999, amount: 1700 },
        { min: 100000, max: 109999, amount: 1800 },
        { min: 110000, max: 119999, amount: 1900 },
        { min: 120000, max: 129999, amount: 2000 },
        { min: 130000, max: 139999, amount: 2100 },
        { min: 140000, max: 149999, amount: 2200 },
        { min: 150000, max: Infinity, amount: 2300 }
    ];

    const NSSF_RATE = 6;

    // Calculate gross salary
    let grossSalary = basicSalary + benefits;

    // Calculate NHIF deductions
    let nhifDeductions = calculateNHIFDeductions(grossSalary);

    // Calculate NSSF deductions
    let nssfDeductions = (basicSalary * NSSF_RATE) / 100;

    // Calculate taxable income
    let taxableIncome = grossSalary - nhifDeductions - nssfDeductions;

    // Calculate PAYE (Tax)
    let payee = calculatePAYE(taxableIncome);

    // Calculate net salary
    let netSalary = grossSalary - payee - nhifDeductions - nssfDeductions;

    return {
        grossSalary,
        payee,
        nhifDeductions,
        nssfDeductions,
        netSalary
    };
}

function calculateNHIFDeductions(grossSalary) {
    for (let i = 0; i < NHIF_RATES.length; i++) {
        if (grossSalary >= NHIF_RATES[i].min && grossSalary <= NHIF_RATES[i].max) {
            return NHIF_RATES[i].amount;
        }
    }
    return 0;
}