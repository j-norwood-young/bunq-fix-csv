const Papa = require("papaparse");
const parseLocaleNumber = require("./parse_locale_number.js");

function BunqCSV(csvdata) {
    const data = Papa.parse(csvdata, { skipEmptyLines: true });
    // console.log(data);
    const headers = data.data[0];    
    const index_amount = headers.indexOf("Amount");
    if (index_amount === -1) throw new Error("Amount not found in CSV");
    const rows = data.data.slice(1);
    for(let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row[index_amount]) continue;
        const amount = row[index_amount];
        const amount_num = parseLocaleNumber(amount, "NL");
        const amount_str = amount_num.toFixed(2);
        // console.log({ amount, amount_num, amount_str });
        row[index_amount] = amount_str;
    }
    return Papa.unparse(data, { quotes: true, newline: "\n" });
}

module.exports = BunqCSV;