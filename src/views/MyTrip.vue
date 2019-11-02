<template>
  <div v-if="!loading">
    <div class="mw7 center">
			<h3>Your trip:</h3>
			<div class="ba pa3">

				<div class="ba pa3">
					<MyTrip :trip="trip"/>
				</div>

				<p>you're making <strong>{{totalProfitOfTrip}}</strong></p>

				<h3 v-if="!trip.counteredRequests.length">No Countered Requests:</h3>
				<h3 v-if="trip.counteredRequests.length">Requests You've countered:</h3>

				<ul class="list pa0 mb3" v-if="trip.counteredRequests.length">
					<li v-for="(counteredRequest) in trip.counteredRequests" :key="counteredRequest.id" class="mb3">
						<div class="ba pa3">
							<h3>name: {{counteredRequest.request.package.name}}</h3>
							<p>Cost of product: {{counteredRequest.request.offeredPrice.currencyCode}} {{counteredRequest.request.package.price.amount}}</p>
							<p>Bounty: {{counteredRequest.request.offeredPrice.currencyCode}} {{counteredRequest.request.offeredPrice.amount}}</p>
							<p>You've countered with: {{counteredRequest.price.amount}}</p>
							<p>Status of counter offer: {{counteredRequest.counterStatus}}</p>
						</div>
					</li>
				</ul>


				<h3 v-if="!trip.attachedRequests.length">No accepted Requests:</h3>
				<h3 v-if="trip.attachedRequests.length">Requests Accepted:</h3>

				<ul class="list pa0 mb3" v-if="trip.attachedRequests.length">
					<li v-for="(request) in trip.attachedRequests" :key="request.id" class="mb3">
						<div class="ba pa3">
							<h3>name: {{request.package.name}}</h3>
							<p>Cost of product: {{request.offeredPrice.currencyCode}} {{request.package.price.amount}}</p>
							<p>Bounty: {{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</p>
							<div class="my3" v-if="isThisAttachedToTrip(request.id)">
								Update status here...
								<select>
									<option value="PURCHASED">Purchased item</option>
									<option value="PICKED_UP">Picked up item</option>
								</select>
							</div>
							<div v-else>Accepted Bounty of: {{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</div>
						</div>
					</li>
				</ul>

			</div>


		</div>

		<div class="mw6 center pb5" v-if="requestForLocation.length >= 1">
			<h3>Requests offered:</h3>
			<ul class="list pa0" v-if="requestForLocation">
				<li v-for="(request) in requestForLocation" :key="request.id" class="mb3">
					<TripRequest
						:request="request"
						:tripId="trip.id"
						:isThisAttachedToTrip="isThisAttachedToTrip(request.id)"
						@requestChanged="getTrip()"/>
				</li>
			</ul>
		</div>





		<div v-else class="mw6 center">
			<h3>No Requests for your destination</h3>
			<p>Try adding stops on your trip! (idea)</p>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import MyTrip from '@/components/MyTrip.vue'
import TripRequest from '@/components/TripRequest.vue'

export default {
	name: 'myTripView',
	components: {
		MyTrip,
		TripRequest,
	},

	data() {
		return {
			trip: {},
			requestForLocation: [],
			loading: true,
			counteringOfferId: null,
		}
	},

	computed: {
		totalProfitOfTrip() {
			let currencyCode = '';
			let total = Number(0);

			// Get all prices
			const prices = this.trip.attachedRequests.map((request) => {
				// TODO: make sure this is the same for all attached...
				currencyCode = request.offeredPrice.currencyCode;

				return request.offeredPrice.amount;
			})

			// Add all prices together
			for (let i = 0; i < prices.length; i++) {
				const price = prices[i];
				total += parseInt(price);
			}

			return `${currencyCode} ${total}`;
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
				.catch(() => {
					this.$router.push({ name: 'home'})
				})
		},


		// Is this request attached to trip? return true or false;
		isThisAttachedToTrip(requestId) {
			const attachedRequests = this.trip.attachedRequests.filter((request) => request.id === requestId)[0]
			return (attachedRequests ? true : false)
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
		},
	},

	mounted() {
		this.getTrip();

		console.log('MyTrip: remove duplicates of same offer.. can only be one');

	},
}
</script>

<style lang="scss">

</style>