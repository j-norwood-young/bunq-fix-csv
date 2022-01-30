/**
 * Parse a localized number to a float.
 * @param {string} stringNumber - the localized number
 * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
 * 
 * Source: https://stackoverflow.com/questions/29255843/is-there-a-way-to-reverse-the-formatting-by-intl-numberformat-in-javascript
 */
 function parseLocaleNumber(stringNumber, locale) {
    if (locale === undefined) {
        locale = Intl.NumberFormat().resolvedOptions().locale;
    }
    if (stringNumber === undefined) {
        return undefined;
    }
    var thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '');
    var decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '');
    try {
        return parseFloat(stringNumber
            .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
            .replace(new RegExp('\\' + decimalSeparator), '.')
        );
    } catch (e) {
        console.error(`parseLocaleNumber error: ${e}`);
        return NaN;
    }
}

module.exports = parseLocaleNumber;