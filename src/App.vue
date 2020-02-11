<template>
  <div id="app">


    <div id="nav" >
      <router-link to="/">🏠</router-link> 
      <!-- <router-link to="/about">About</router-link> | -->
      <router-link to="/trips">Trips</router-link>  
      <router-link to="/requests">Requests</router-link>
    </div>
    <router-view/>


		<div class="modal modal--center" v-if="this.appMessage.title !== ''">
			<div class="modal-overlay"></div>
			<div class="modal-content my2 pa3 bg-near-white flex items-center">
				<div class="app-width center">
					<h1 class="ma0 mb2">{{this.appMessage.title}}</h1>
					<h4 class="ma0">{{this.appMessage.message}}</h4>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'tachyons';

export default {
	name: 'app',
	computed: {
		...mapState({
			appMessage: state => state.appMessage,
		}),
	},
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
	max-width: 400px;
	// border: 1px solid #ccc;
	margin: 0 auto
}

.app-width {
	max-width: 400px;
}

// expand the flex item to it's fullest
.flex-1 {
	flex: 1;
}

#nav {
  padding: 30px 0;


  a {
		font-size: 1.1em;
		margin-right: 10px;
    font-weight: bold;
		text-decoration: none;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
	// height: 2.2em;
	// padding: 0 1.3em;
	// box-shadow: 0px 4px 4px 0px #ccc;
	// background: #42b983;
	// color: #fff;
	// font-weight: bold;
	// font-size: 1.1em;
	// cursor: pointer;
	// position: relative;
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
.status {
	padding: 0.2em 0.5em;
	border-radius: 5px;
	border: 1px solid #ccc;
	background: #ccc;
	color: #fff;
}
.status--accepted {
	background: #3b923e;
}
.status--rejected {
	background: #da4646;
}
.status--pending {
	background: #a9a9a9;
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
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	border-radius: 0 0 15px 15px;
	overflow: hidden;

	li {
		border-bottom: 1px solid #ccc;
		&:last-child {
			border-bottom: 0;
		}
	}
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
			left: -6px;
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


button {
	border: 0;
	cursor: pointer;
}
.logo {
	height: 30px;
	width: 30px;
	background: #333;
	// float: left;
	margin: 0 10px 0 0;
}
p {
	line-height: 1.5;
}

.text--info {
	color: #979797;
	font-size: .9em;
}

.big-block {
	width: 100%;
	height: 183px;
	font-size: 1.3em;
	
}
.medium-block {
	width: 100%;
	height: 93px;
	font-size: 1.1em;
}
.small-block {
	width: 100%;
	// height: 183px;
	font-size: 1.1em;
}
.box {
	border-radius: 15px;
	background: #333;
	color: #fff;
	padding: 1rem;

	&:hover {
		background: #444;
	}
}
	.box--light {
		background: #fff;
		color: #979797;
		border: 1px solid #979797;

		&:hover {
			background: #f3f3f3;
		}
	}
		.box--light--active {
			background: #fff;
			color: #333;
			border: 1px solid #333;
		}


.modal-overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	background: #000;
	z-index: 1;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	opacity: .5;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes modalPopIn {
	from {
		transform: scale(1.1)
	}
	to {
		transform: scale(1)
	}
}
@keyframes modalBottomSlideUp {
	from {
		transform: translateY(100%)
	}
	to {
		transform: translateY(0%) 
	}
}
.modal {
	position: fixed;
}

.modal--center {
	width: 100%;
	left: 0;
	bottom: 0%;
	top: 0%;
	left: 0;
	right:0;
	// height: 70%;
	overflow: scroll;
	height: 100vh;
	animation: .3s .1s alternate modalPopIn ease-in-out;

	.modal-content {
		height: 100vh;

		h1 {
			animation: .3s alternate fadeIn ease-in-out;
		}
		h4 {
			animation: .3s .1s alternate fadeIn ease-in-out;
		}
	}
}
.modal--bottom {
	width: 100%;
	left: 0;
	bottom: 0%;
	// height: 70%;
	overflow: scroll;
	height: 65vh;
	animation: .3s alternate modalBottomSlideUp ease-in-out;

	.modal-content {
		height: 65vh;
	}
}
.modal-content {
	border-top: 1px solid #ccc;
	z-index: 2;
	position: relative;
}


.text--increase {
	color: #73ff73;
	font-size: 1.4em;
	line-height: 0;
	vertical-align: middle;
}
</style>
	
