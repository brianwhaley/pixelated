
git remote add pixelated-components https://github.com/brianwhaley/pixelated-components.git
npm config set registry https://registry.npmjs.org
npm login --scope=@brianwhaley --registry=https://registry.npmjs.org

npm outdated | awk 'NR>1 {print $1"@"$4}' | xargs npm install --force --save

eslint --fix --ext .js,.jsx .

eslint --fix
npm run build
npm version patch --force
git add * -v
git commit -m "fix for google analytics 4 tag component"
git push pixelated-components dev --tags --force
git push pixelated-components dev:main -f
npm publish
https://www.npmjs.com/package/@brianwhaley/pixelated-components


https://www.dhiwise.com/post/how-to-structure-and-organize-react-css-modules


## Building for web and node modules
https://www.totaltypescript.com/concepts/mjs-cjs-mts-and-cts-extensions

package.json main vs module:
https://www.google.com/search?q=what+is+package.json+main+field+vs+module+field&oq=what+is+package.json+main+field+vs+module+field&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigAdIBCDkzMzFqMWo3qAIAsAIA&sourceid=chrome&ie=UTF-8

how to get typescript to work with esm and cjs:
https://www.google.com/search?q=how+to+get+typescript+to+work+with+esm+and+cjs&num=10&sca_esv=fee75db914028769&sxsrf=AHTn8zqTwjKaSycv2DPzgapkwA96gEFmPA%3A1747832570507&ei=-s4taJXZHsqs5NoP2K-foAg&ved=0ahUKEwiVvvfbz7SNAxVKFlkFHdjXB4QQ4dUDCBA&uact=5&oq=how+to+get+typescript+to+work+with+esm+and+cjs&gs_lp=Egxnd3Mtd2l6LXNlcnAiLmhvdyB0byBnZXQgdHlwZXNjcmlwdCB0byB3b3JrIHdpdGggZXNtIGFuZCBjanMyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIxB9Q6w9Ynx1wAXgBkAEAmAFfoAGCBaoBATi4AQPIAQD4AQGYAgmgAqcFwgIKEAAYsAMY1gQYR8ICChAhGKABGMMEGArCAgUQIRirAsICCBAhGKABGMMEmAMAiAYBkAYIkgcDOC4xoAftF7IHAzcuMbgHogU&sclient=gws-wiz-serp 

## MULTIPLE WEBPACK CONFIGS
https://www.google.com/search?q=webpack+for+client+and+server+bundles&oq=webpack+for+client+and+server+bundles&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIHCAQQIRifBTIHCAUQIRifBTIHCAYQIRifBTIHCAcQIRifBTIHCAgQIRifBTIHCAkQIRifBdIBCDk1ODBqMWo3qAIAsAIA&sourceid=chrome&ie=UTF-8

https://www.google.com/search?q=can+you+configure+webpack+for+both+client+and+server+components&num=10&sca_esv=8b5461fdae76c1f4&sxsrf=AHTn8zppxYpeAooyTFmfOVbeUXl0-NtmKA%3A1747580616602&ei=yPYpaNyfJPyxptQP5vaXUA&ved=0ahUKEwjco_mOpa2NAxX8mIkEHWb7BQoQ4dUDCBA&uact=5&oq=can+you+configure+webpack+for+both+client+and+server+components&gs_lp=Egxnd3Mtd2l6LXNlcnAiP2NhbiB5b3UgY29uZmlndXJlIHdlYnBhY2sgZm9yIGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIgY29tcG9uZW50c0j6TlC_TFi_THADeAGQAQCYAVegAVeqAQExuAEDyAEA-AEBmAIDoAIMwgIKEAAYsAMY1gQYR5gDAIgGAZAGApIHATOgB3OyBwC4BwA&sclient=gws-wiz-serp

## MULTIPLE ENTRY POINTS : 
https://stackoverflow.com/questions/63058081/package-json-with-multiple-entrypoints
https://webpack.js.org/configuration/module/#rule


## Shields.io MD Badges
https://github.com/inttter/md-badges?tab=readme-ov-file 