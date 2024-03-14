[available on npmjs](https://www.npmjs.com/package/cute-fs)
# cute-fs
This package **_solves_** the issue of file writes being confusing with vague syntax. With cute-fs, dirs in the middle are always created if they don't exist. soft.write() does not overwrite but hard.overwrite() will always write. You can also mix unix/windows slashes.


### Install


```
npm install -g cute-fs
```


### Use


```JavaScript
import URL from 'cute-fs';
URL('C:\\WindowsLikePathOr/LinuxLike/Path.txt').soft.write(`any`);
URL('path/to/file.txt').hard.overwrite(`any`);
```

We use URL because we want cute-fs to be universal. Soon we will add ability to read which will include local and web.

