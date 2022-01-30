const fix_amounts = require("../libs/fix_amounts");
const fix_headings = require("../libs/fix_headings");
const parseLocaleNumber = require("../libs/parse_locale_number");

const test_data = `"Date","Interest Date","Amount","Account","Counterparty","Name","Description"
"2021-10-01","2021-10-01","-17,38","NL90BUNQ1234567","","JOE","JOE PHILADELPHIA, US 20.00 USD, 1 USD = 0.86900 EUR"
"2021-10-01","2021-10-01","-10,00","NL90BUNQ1234567","","BOB",""
"2021-10-01","2021-10-01","-1.034,75","NL90BUNQ1234567","","FRED IN-12345","FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86875 EUR"
"2021-10-01","2021-10-01","-609.450.010,25","NL90BUNQ1234567","","BOB",""
"2021-10-01","2021-10-01","-0,82","NL90BUNQ1234567","","BOB",""
"2021-10-01","2021-10-01","34,75","NL90BUNQ1234567","","FRED IN-12345","Refund: FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86875 EUR"
"2021-10-01","2021-10-01","-34,58","NL90BUNQ1234567","","FRED IN-12345","FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86450 EUR"
"2021-10-01","2021-10-01","-0,16","NL90BUNQ1234567","","BOB",""
"2021-10-01","2021-10-01","-0,98","NL90BUNQ1234567","","BOB",""

`

const fix_amounts_expected_result = `"Date","Interest Date","Amount","Account","Counterparty","Name","Description"
"2021-10-01","2021-10-01","-17.38","NL90BUNQ1234567","","JOE","JOE PHILADELPHIA, US 20.00 USD, 1 USD = 0.86900 EUR"
"2021-10-01","2021-10-01","-10.00","NL90BUNQ1234567","","BOB",""
"2021-10-01","2021-10-01","-1034.75","NL90BUNQ1234567","","FRED IN-12345","FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86875 EUR"
"2021-10-01","2021-10-01","-609450010.25","NL90BUNQ1234567","","BOB",""
"2021-10-01","2021-10-01","-0.82","NL90BUNQ1234567","","BOB",""
"2021-10-01","2021-10-01","34.75","NL90BUNQ1234567","","FRED IN-12345","Refund: FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86875 EUR"
"2021-10-01","2021-10-01","-34.58","NL90BUNQ1234567","","FRED IN-12345","FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86450 EUR"
"2021-10-01","2021-10-01","-0.16","NL90BUNQ1234567","","BOB",""
"2021-10-01","2021-10-01","-0.98","NL90BUNQ1234567","","BOB",""`

const fix_headings_expected_results = `"Date","Amount","Payee","Description"
"2021-10-01","-17,38","JOE","JOE PHILADELPHIA, US 20.00 USD, 1 USD = 0.86900 EUR"
"2021-10-01","-10,00","BOB",""
"2021-10-01","-1.034,75","FRED IN-12345","FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86875 EUR"
"2021-10-01","-609.450.010,25","BOB",""
"2021-10-01","-0,82","BOB",""
"2021-10-01","34,75","FRED IN-12345","Refund: FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86875 EUR"
"2021-10-01","-34,58","FRED IN-12345","FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86450 EUR"
"2021-10-01","-0,16","BOB",""
"2021-10-01","-0,98","BOB",""`

const fix_headings_and_amounts_expected_results = `"Date","Amount","Payee","Description"
"2021-10-01","-17.38","JOE","JOE PHILADELPHIA, US 20.00 USD, 1 USD = 0.86900 EUR"
"2021-10-01","-10.00","BOB",""
"2021-10-01","-1034.75","FRED IN-12345","FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86875 EUR"
"2021-10-01","-609450010.25","BOB",""
"2021-10-01","-0.82","BOB",""
"2021-10-01","34.75","FRED IN-12345","Refund: FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86875 EUR"
"2021-10-01","-34.58","FRED IN-12345","FRED IN-12345 67890, US 40.00 USD, 1 USD = 0.86450 EUR"
"2021-10-01","-0.16","BOB",""
"2021-10-01","-0.98","BOB",""`

test("parseLocaleNumber", () => {
    expect(parseLocaleNumber("-10,00", "NL")).toBe(-10);
    expect(parseLocaleNumber("-17,38", "NL")).toBe(-17.38);
    expect(parseLocaleNumber("-101,00", "NL")).toBe(-101);
    expect(parseLocaleNumber("-10.010.010,00", "NL")).toBe(-10010010);
    expect(parseLocaleNumber("-10.010.010,25", "NL")).toBe(-10010010.25);
    expect(parseLocaleNumber("10.010.010,50", "NL")).toBe(10010010.5);
    expect(parseLocaleNumber("10,010,010.50", "US")).toBe(10010010.5);
})

test("Fix amounts", () => {
    const result = fix_amounts(test_data);
    expect(result).toBe(fix_amounts_expected_result);
});

test("Fix headings", () => {
    const result = fix_headings(test_data);
    expect(result).toBe(fix_headings_expected_results);
});

test("Fix headings and amounts", () => {
    const result = fix_amounts(fix_headings(test_data));
    expect(result).toBe(fix_headings_and_amounts_expected_results);
});