<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import 'tachyons';

export default {
  name: 'app',
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

input {
	margin-bottom: 1em;
	width: 100%;
	padding: .5em;
	box-sizing: border-box;
	height: 3em;
}
label {
	display: block;
	margin-bottom: .5em;
}

.location-suggestion-dropdown {
	padding: 0;
	list-style: none;
	margin: 0;
	position: absolute;
	top: calc(100% - 1em);
	left: 0;
	width: 100%;
	z-index: 1;

	button {
		width: 100%;
    text-align: left;
    padding: 0.5em 0.6em;
	}
}
</style>
