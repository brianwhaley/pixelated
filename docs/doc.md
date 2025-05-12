# ===== PALMETTO-EPOXY APP NOTES =====

## ===== CREATE APP =====

npx create-next-app@latest

npm run dev

https://localhost:3000

## ===== COMMON NPM COMMANDS =====

npm outdated | awk 'NR>1 {print $1"@"$4}' | xargs npm install --force --save

npm install @brianwhaley/pixelated-components@latest --force --save

rm -rf node_modules && rm -rf package-lock.json && npm install --force

## ===== BUILD PIXELATED APP =====

npm version major
npm version minor

eslint --fix
npm version patch --force
git add * -v
git commit -m "add terms, privacy pages and components, removed joke page, reorg routes"
git push palmetto-epoxy dev --tags
git push palmetto-epoxy dev:main


## ===== ARTWORK =====
https://www.freepik.com/free-vector/rainbow-coloured-watercolour-splatter-design-0307_58525796.htm#fromView=keyword&page=1&position=1&uuid=368642c7-d47f-457a-876f-a35218120abf&query=Watercolor+Splatter