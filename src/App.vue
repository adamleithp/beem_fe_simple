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

// expand the flex item to it's fullest
.flex-1 {
	flex: 1;
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

button {
	height: 2.2em;
	padding: 0 1.3em;
	box-shadow: 0px 4px 4px 0px #ccc;
	background: #42b983;
	color: #fff;
	font-weight: bold;
	font-size: 1.1em;
	cursor: pointer;
	position: relative;
}
.badge {
	position: absolute;
	top: 0.3em;
	margin-left: 0.5em;
	background: #4a6954;
	color: white;
	padding: 0.2em;
	border-radius: 50%;
	height: 1em;
	width: 1em;
	text-align: center;
	line-height: 1.15em;
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

	@keyframes slidein {
		from {
			transform: translateX(25%) rotate(90deg)
		}
		to {
			transform: translateX(75%) rotate(90deg)
		}
	}

	.trip-animation {
		margin: 0 3em;
		height: 3px;
		position: relative;
		background: #f7f7f7;

		svg {
			left: 40%;
			top: -10px;
			position: absolute;
			animation: 2s infinite alternate slidein ease-in-out;
			transform: rotate(90deg)
		}
	}

.tabs {

}
.tabs__header {
	button {
		background: none;
		box-shadow: none;
		color: #000;
		border: 0;
		background: #e4e4e4;

		&:focus {
			z-index: 2;
		}
		&.tab--active {
			background: #fff;
			z-index: 1;
		}
	}
}
.tabs__content {

}
</style>
