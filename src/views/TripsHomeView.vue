<template>
  <div class="w-100 pb6 pt5">

		<div class="mt5 ph2 mb4">
			<h1>Trips</h1>
			<p>
				Make money while travelling. <br>
				Create a trip, and find user offers <br>
				of items you can bring.
			</p>
		</div>
		
		<div class="mb4 ph2">
			<button class="small-block box">
				Scan email to find trips.
			</button>
			<p class="text--info">You can have trips added automatically in <u>Settings</u>.</p>
		</div>
		
		<div class="ph2 mb4">
			<h2>My Trips</h2>
			<p>
				These are your upcoming trips in your email.
			</p>
		</div>


		<ul v-if="this.myTrips" class="list ph2 ma0 mb3">
			<li v-for="(trip) in this.myTrips" :key="trip.id" class="mb3">
				<router-link :to="{ name: 'my-trip', params: { id: trip.id }}" class="link">
					<MyTrip :trip="trip" isLink="true"/>
				</router-link>
			</li>
		</ul>
		

    <div class="mb3 ph2">
			<button class="small-block box" @click="() => isTripFormVisible = !isTripFormVisible">
				{{isTripFormVisible ? "Close form" : "Create"}}
			</button>
		</div>

		<div class="modal modal--bottom" v-if="isTripFormVisible">
			<div class="modal-overlay" @click="() => isTripFormVisible = !isTripFormVisible"></div>
			<div class="modal-content my2 pa3 bg-near-white h100">
				<div class="app-width center">
					<TripForm @tripCreated="isTripFormVisible = false"/>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex';
import MyTrip from '@/components/MyTrip.vue'
import TripForm from '@/components/TripForm.vue'

export default {
	name: 'TripsView',
	components: {
		MyTrip,
		TripForm,
	},

	data() {
		return {
			trip: {},
			isTripFormVisible: false,
		}
	},

	computed: {
		...mapState({
			myTrips: state => state.myTrips,
		}),
	},
	mounted() {
		this.$store.dispatch('getMyTrips')
	},
}
</script>

<style lang="scss">

</style>