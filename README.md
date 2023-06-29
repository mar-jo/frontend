# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```



# TODOS
- State management if logged in or not
- get the todos of only the specific user
- improve login and register modal
- test framework:
    - install and configure
    - test

Allgemein requirements
1. LOGIN: Allow users to register and login, so that multiple users can use your
product, e.g., each user has its own Todos
2. SORT: Sort the Todos by date and unfinished Todos automatically go to the
next day, finished Todos stay in the day when they were finished.
    - part of a bigger feature, make sure that this feature is behind a *feature toggle*, which can be turn on and off at runtime.
3. RegisterButtonABTesting: Create a register button in two different colors and two different
headlines.
    - should be used in an AB-Test. Split your users into two
different groups and deliver two different register buttons and headlines to
the end user.