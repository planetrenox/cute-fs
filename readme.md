[available on npmjs](https://www.npmjs.com/package/cute-fs)
# cute-fs
This package **_solves_** the issue of file writes being confusing with vague syntax. With cute-fs, dirs in the middle are always created if they don't exist. soft.write() does not overwrite but hard.overwrite() will always write. You can also mix unix/windows slashes.


### Install


```
npm install -g cute-fs
```


### Use


```JavaScript
import fURL from 'cute-fs';
fURL('C:\\WindowsLikePathOr/LinuxLike/Path.txt').soft.write('any text');
fURL('path/to/file.txt').hard.overwrite(`any text`);
```

The writing functionality for web URLs is not documented because it is still in testing. Feel free to look at the repo and you are encouraged to get creative.

