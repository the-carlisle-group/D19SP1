Acre 6.0.0+248 2019-08-22 21:27

## Acre Desktop - Release Notes

* All acre commands and API functions have been consolidated such that both sets are comprised of the union of the two.
* They are identically named in "PascalCase".
* Their arguments, although formatted differently contain the same data.
* Arguments, Options and Flags are specified
  * in commands as -   argument1   argument2   -option=value      -flag'
  * in functions as - 'argument1' 'argument2' ('option' 'value') ('flag' 1)
* The API space is changed from "⎕SE.acreAPI" to "⎕SE.acre".
* The config-file "acre.config" is now created in "JSON" which is supported in all Dyalog versions from 14.1 to present.

Phil 2019-08-22 21:27 5.2.0+247
