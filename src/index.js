const fix_amounts = require("../libs/fix_amounts.js");
const fix_headings = require("../libs/fix_headings.js");

function convertCSV(csv_txt) {
    const do_fix_amounts = document.getElementById('check_number_format').checked;
    const do_fix_headings = document.getElementById('check_column_names').checked;
    let csv_result = csv_txt;
    if (do_fix_amounts) {
        csv_result = fix_amounts(csv_result);
    }
    if (do_fix_headings) {
        csv_result = fix_headings(csv_result);
    }
    return csv_result;
}

function download(data, fname, type, sender) {
    try {
        var a = document.createElement('a');
        var file = new Blob([convertCSV(data)], {type: type});
        a.href = URL.createObjectURL(file);
        a.download = fname;
        a.click();
    } catch (e) {
        const alert = document.createElement('div');
        alert.classList.add('alert');
        alert.classList.add('alert-danger');
        alert.classList.add('mt-3');
        alert.innerHTML = `<strong>Error:</strong> ${e.message}`;
        sender.parentNode.appendChild(alert);
    }
}

function handleFileSelect(evt) {
    console.log(evt);
    var files = evt.target.files; // FileList object
    // Loop through the FileList prepare to convert.
    for (var i = 0, f; f = files[i]; i++) {
        console.log(f);
        // Only process csv files.
        if (!f.type.match('text/csv')) {
            continue;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                const outputEl = document.getElementById('output_files');
                outputEl.classList.add("row");
                outputEl.classList.add("mt-3");
                const el = document.createElement('div');
                el.classList.add('output_file');
                el.classList.add("col-12");
                el.classList.add("mt-3");
                const csv_txt = e.target.result;
                try {
                    // const result = convertCSV(csv_txt);
                    // Add card to el
                    const card = document.createElement('div');
                    card.classList.add('card');
                    const card_body = document.createElement('div');
                    card_body.classList.add('card-body');
                    const card_title = document.createElement('h5');
                    card_title.classList.add('card-title');
                    card_title.innerHTML = theFile.name;
                    
                    // Create button
                    const btn = document.createElement('button');
                    btn.classList.add('btn');
                    btn.classList.add('btn-primary');
                    btn.innerHTML = 'Download';
                    btn.addEventListener('click', function() {
                        const fname = theFile.name.replace(".csv", "-fixed.csv");
                        download(csv_txt, fname, 'text/csv', btn);
                    });
                    card_body.appendChild(card_title);
                    card_body.appendChild(btn);
                    card.appendChild(card_body);
                    el.appendChild(card);
                } catch (err) {
                    el.innerHTML = `<div class='alert alert-danger'>
                    <h4>${theFile.name}</h4>
                    <strong>Error:</strong> ${err.message}</div>`;
                }
                outputEl.appendChild(el);
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
}

function main() {
    // Load on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    });
}

main();