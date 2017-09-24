Fun with [ramda 🐏](http://ramdajs.com/) .

Creates an 'identicon' (e.g. a default github avatar) loosely following this guide (using pngjs):
http://writings.orangegnome.com/writes/creating-identicons/

Rough steps:
* Get String
* Convert string to MD5 hash
* Extract identicon color from hash (use the first 3 numbers of hash as RGB)
* Convert hash values to boolean values to determine each block in the 5×5 grid
* Create image based off of values

Generate a new png based on a seed
```shell
npm run build-png -- --seed=foo
```

Launch the web app
```shell
npm start
```
