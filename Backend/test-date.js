const dbDate = new Date('2026-06-24T18:30:00.000Z');
console.log("DB Date local:", dbDate.toLocaleDateString('en-CA'));
console.log("DB Date ISO:", dbDate.toISOString().split('T')[0]);

// A better way that works regardless of server timezone is to just check if the inputDob matches either the UTC date or the UTC date + 1 day (or whatever).
// Or we can just use `dbDate.toLocaleDateString('sv-SE')` which is YYYY-MM-DD.

// Wait, the input from HTML5 date picker is exactly "YYYY-MM-DD".
const inputDob = "2026-06-25";

const dbDateString1 = dbDate.toISOString().split('T')[0];
const dbDateString2 = new Date(dbDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

console.log("Match 1:", inputDob === dbDateString1);
console.log("Match 2:", inputDob === dbDateString2);
