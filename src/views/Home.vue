<template>
  <div class="w-100 pb6 pt5">

		<div class="mt5 ph2 mb4 flex flex-row align-center">
			<div class="logo"></div><h3 class="ma0 mt1">BEEM</h3>
		</div>

		<div class="ph2 mb4">
			<h1>Hello, Adam</h1>
			<p>
				Make money while travelling,<br>
				or get anything delivered around the world.<br>
				It starts here with Beem.
			</p>
		</div>

		<div class="flex">	
			<div class="w-50 ph2">
				<router-link :to="{ name: 'trips'}" class="link">
					<div class="big-block box">
						Trips
					</div>
				</router-link>
			</div>
			<div class="w-50 ph2">
				<router-link :to="{ name: 'requests'}" class="link">
					<div class="big-block box">
						Requests
					</div>
				</router-link>
			</div>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import { mapState } from 'vuex';
// import MyRequest from '@/components/MyRequest.vue'
// import RequestForm from '@/components/RequestForm.vue'
// import MyTrip from '@/components/MyTrip.vue'
// import TripForm from '@/components/TripForm.vue'

export default {
	name: 'home',
	components: {
		// MyRequest,
		// RequestForm,
		// MyTrip,
		// TripForm,
	},
	data() {
		return {
			// isRequestFormVisible: false,
			// isTripFormVisible: false
		}
	},
	// computed: {
	// 	...mapState({
	// 		myRequests: state => state.myRequests,
	// 		myTrips: state => state.myTrips,
	// 	}),
	// },
	// mounted() {
	// 	this.$store.dispatch('getMyRequests')
	// 	this.$store.dispatch('getMyTrips')
	// },
}

</script>


<style lang="scss">
.card-link {
	color: inherit;
	display: block;
	text-decoration: none;
	box-shadow: 0px 4px 2px 3px #ccc;

	&:hover {
		box-shadow: 0px 4px 2px 1px #ccc;
		background: #f3f3f3;
	}
}

</style>


