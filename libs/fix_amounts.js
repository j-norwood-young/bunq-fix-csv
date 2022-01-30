const Papa = require("papaparse");
const parseLocaleNumber = require("./parse_locale_number.js");

function _fix_amounts(data) {
    const headers = data[0];   
    const index_amount = headers.indexOf("Amount");
    if (index_amount === -1) throw new Error("Amount not found in CSV");
    for(let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row[index_amount]) continue;
        const amount = row[index_amount];
        const amount_num = parseLocaleNumber(amount, "NL");
        const amount_str = amount_num.toFixed(2);
        row[index_amount] = amount_str;
    }
    return data;
}

function fix_amounts(csvdata) {
    const parsed_csv = Papa.parse(csvdata, { skipEmptyLines: true });
    const rows = _fix_amounts(parsed_csv.data);
    return Papa.unparse(rows, { quotes: true, newline: "\n" });
}

module.exports = fix_amounts;