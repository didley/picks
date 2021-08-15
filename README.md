# <b>picks</b>
Picks is a link sharing web app with a limit of 5 links per post and one post a week.

Its a work in progress and primarily built as a practice project to learn testing and older react methods.

The client is built with react without hooks, Redux & Sagas for state management, React Testing Library & Mock Service Worker for client testing.

The backend is built with express & mongoose 

## Demo
![Profile page demo](demo/picks-profile.gif)

### Setup

```console
$ cd picks
$ yarn install
```
or
```console
$ cd picks
$ npm install
```

### Running

<i>Remove .example form .env.example in /backend & /client_web</i>

```console
# runs client & server 
$ cd picks
$ yarn start

# runs client
$ cd client_web
$ yarn start

# runs server
$ cd backend
$ yarn start

# run tests (Only client tests implemented)
$ cd client_web
$ yarn test


```

