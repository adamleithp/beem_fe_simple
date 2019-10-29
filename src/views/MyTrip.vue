<template>
  <div v-if="!loading">
    <div class="mw7 center">
			<h3>Your trip:</h3>
			<div class="ba pa3 flex justify-between">
				<div>
					<h3><Place :placeId="trip.fromLocation.googlePlaceId"/></h3>
					<h3>{{formatDatetoYMD(trip.fromDate)}}</h3>
				</div>
				<div class="tr">
					<h3><Place :placeId="trip.toLocation.googlePlaceId"/></h3>
					<h3>{{formatDatetoYMD(trip.toDate)}}</h3>
				</div>
			</div>
		</div>

		<div class="mw6 center" v-if="requestForLocation.length">
			<h3>Requests offered:</h3>
			<ul class="list pa0">
				<li v-for="(request) in this.requestForLocation" :key="request.id">
					<div class="ba pa3">
						<h3>name: {{request.package.name}}</h3>
						<p>Bounty: {{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</p>
					</div>
				</li>
			</ul>
		</div>
		<div v-else class="mw6 center">
			<h3>No Requests for your destination</h3>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Place from '@/components/Place.vue'

export default {
	name: 'myTrip',
	components: {
		Place
	},

	data() {
		return {
			trip: {},
			requestForLocation: [],
			loading: true,
		}
	},

	methods: {
		async getTrip() {
			this.$store.dispatch('getMyTrip', this.$route.params.id)
				.then((trip) => {
					this.trip = trip;
					this.loading = false;

					// Get requests at trip destination location
					this.$store.dispatch('getRequestsForLocation', this.trip.toLocation.googlePlaceId)
						.then((requests) => {
							this.requestForLocation = requests;
						})
				})
		},

		formatDatetoYMD(unixTimeStamp) {
			let d = new Date(unixTimeStamp * 1000),
				month = '' + (d.getMonth()),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2)
				month = '0' + month;
			if (day.length < 2)
				day = '0' + day;

			return [year, month, day].join('-');
		}
	},

	mounted() {
		this.getTrip();

		// // Get lng/lat from place_id
		// await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${$route.params}&fields=geometry&key=${process.env.VUE_APP_GOOGLE_API_KEY}`)
		// 	.then((response) => {
		// 		return response.json();
		// 	})
		// 	.then((json) => {
		// 		console.log('json', json);

		// 		// Save for payload POST createTrip
		// 		this.trip[whichLocationObject].lat = json.result.geometry.location.lat;
		// 		this.trip[whichLocationObject].lng = json.result.geometry.location.lng;
		// 	});
	},
}
</script>