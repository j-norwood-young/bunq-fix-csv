const Papa = require("papaparse");
const headers_map = {
    "Date": {
        old_name: "Date",
        index: -1
    },
    "Amount": {
        old_name: "Amount",
        index: -1
    },
    "Payee": {
        old_name: "Name",
        index: -1
    },
    "Description": {
        old_name: "Description",
        index: -1
    },
}
function _fix_headings(data) {
    const old_headers = data[0];
    const new_data = [];
    const new_headers = [];
    for (let n in headers_map) {
        new_headers.push(n);
        headers_map[n].index = old_headers.indexOf(headers_map[n].old_name);
    }
    for(let i = 1; i < data.length; i++) {
        const row = data[i];
        let new_row = [];
        const obj_data = {};
        for (let j = 0; j < old_headers.length; j++) {
            obj_data[old_headers[j]] = row[j];
        }
        for (let n of new_headers) {
            if (headers_map[n].index !== -1) {
                new_row.push(obj_data[headers_map[n].old_name]);
            }
        }
        new_data.push(new_row);
    }
    new_data.unshift(new_headers);
    return new_data;
}

function fix_headings(csvdata) {
    const parsed_csv = Papa.parse(csvdata, { skipEmptyLines: true });
    const rows = _fix_headings(parsed_csv.data);
    return Papa.unparse(rows, { quotes: true, newline: "\n" });
}

module.exports = fix_headings;