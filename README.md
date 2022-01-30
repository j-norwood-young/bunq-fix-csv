# Bunq Fix CSV

Fixes the formatting problem of bunq csv statement exports, where the amounts are formatted with a Dutch number format with a comma deciman separator (xxx.xxx.xxx,xx), but most accounting software expects plain number format with a full stop separator (xxxxxxxxx.xx).

## Usage

```
Usage: bunq-fix-csv.js -f <csvfile> -o [fileout] [options]

Options:
      --version  Show version number                                   [boolean]
  -f, --file     Load a file                                          [required]
  -o, --fileout  Output to file
  -h, --help     Show help                                             [boolean]

Examples:
  bunq-fix-csv.js -f bunk-statement.csv  change csv amounts to correct
                                         formatting for importing into
                                         accounting packages
```

Copyright Jason Norwood-Young <jason@10layer.com> 2022