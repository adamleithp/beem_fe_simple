<template>
  <div class="my-trip pb5" v-if="!loading">
		<div class="w-100 pt2 mb4">

			<div class="mt5 ph2 mb4 flex flex-row align-center">
				<router-link to="/trips" class=" black f6 text--info">
					<h3 class="ma0 mt1">Back to Trips</h3>
				</router-link>  
			</div>

			<div class="ph2 mb4">
				<h1>My Trip</h1>
				<p>
					This is your trip, here you can see requests for delivery in your destination.
				</p>
			</div>

			<div class="ph2 mb3">
				<MyTrip :trip="trip"/>
			</div>

			<div class="ph2">
				<div class="medium-block box box--light">
					Profit
					<h1 class="ma0">{{totalProfitOfTrip}}</h1>
				</div>
			</div>
		</div>


		<div class="ph2">
			<h2>Offers</h2>
			<p>This is the offers that are pending, countered, or accepted.</p>
		</div>

		<div class="flex mb4">	
			<div class="w-33">
				<div class="ph2">
					<div class="medium-block box pointer" 
						:class="showTab === 'attached' ? 'box--light--active':''"
						@click="showTab = 'attached'">
						Accepted
						<h1 class="ma0">{{attachedRequests.length}}</h1>
					</div>
				</div>
			</div>
			<div class="w-33">
				<div class="ph2">
					<div class="medium-block box pointer"
						:class="showTab === 'countered' ? 'box--light--active':''"
						@click="showTab = 'countered'">
						Countered
						<h1 class="ma0">{{counteredRequests.length}}</h1>
					</div>
				</div>
			</div>
			<div class="w-33">
				<div class="ph2">
					<div class="medium-block box pointer"
						:class="showTab === 'offered' ? 'box--light--active':''"
						@click="showTab = 'offered'">
						Pending
						<h1 class="ma0">{{requestForLocation.length}}</h1>
					</div>
				</div>
			</div>
		</div>


		<div class="ph2">
			<div class="" v-if="showTab === 'attached'">
				<p v-if="!attachedRequests.length" class="text--info">No accepted packages yet</p>
				<h3 v-if="attachedRequests.length">Accepted</h3>

				<ul class="list pa0" v-if="attachedRequests.length">
					<li v-for="(request) in attachedRequests" :key="request.id" class="mb3">
						<router-link 
							:to="{ 
								name: 'my-trips-request', 
								params: { 
									tripId: trip.id,
									id: request.id,
									context: 'attached'
								}
							}
						">
							<MyTripsRequest
								:request="request"/>
						</router-link>

					</li>
				</ul>
			</div>


			<div class="" v-if="showTab === 'countered'">
				<p v-if="!counteredRequests.length" class="text--info">No negotations under way</p>
				<h3 v-if="counteredRequests.length">Countered</h3>

				<ul class="list pa0" v-if="counteredRequests.length">
					<li v-for="(counteredRequest) in counteredRequests" :key="counteredRequest.id" class="mb3">
						<!-- <div class="ba pa3">
							<h3>name: {{counteredRequest.request.package.name}}</h3>
							<p>Cost of product: {{counteredRequest.request.offeredPrice.currencyCode}} {{counteredRequest.request.package.price.amount}}</p>
							<p>Bounty: {{counteredRequest.request.offeredPrice.currencyCode}} {{counteredRequest.request.offeredPrice.amount}}</p>
							<p>You've countered with: {{counteredRequest.price.currencyCode}} {{counteredRequest.price.amount}}</p>
							<p>Status of counter offer: {{counteredRequest.counterStatus}}</p>
						</div> -->

						<router-link 
							:to="{ 
								name: 'my-trips-request', 
								params: { 
									tripId: trip.id,
									id: counteredRequest.request.id,
									context: 'countered'
								}
							}
						">
							<MyTripsRequest
								:request="counteredRequest.request"/>
						</router-link>
					</li>
				</ul>
			</div>


			<div class="" v-if="showTab === 'offered'">
				<!-- <h3 v-if="!requestForLocation.length"></h3> -->
				<p v-if="!requestForLocation.length" class="text--info">No packages requested to <Place :placeId="trip.toLocation.googlePlaceId"/> yet 😥</p>
				<h3 v-if="requestForLocation.length">Offered</h3>

				<ul class="list pa0" v-if="requestForLocation">
					<li v-for="(request) in requestForLocation" :key="request.id" class="mb3">
						<router-link 
							:to="{ 
								name: 'my-trips-request', 
								params: { 
									tripId: trip.id,
									id: request.id,
									context: 'offered'
								}
							}
						">
							<MyTripsRequest
								:request="request"/>
						</router-link>

					</li>
				</ul>
			</div>
		</div>


  </div>
</template>

<script>
/* eslint-disable no-console */
import Place from '@/components/Place.vue'
import MyTrip from '@/components/MyTrip.vue'
import MyTripsRequest from '@/components/MyTripsRequest.vue'

export default {
	name: 'myTripView',
	components: {
		Place,
		MyTrip,
		MyTripsRequest,
	},

	data() {
		return {
			trip: {},
			requestForLocation: [],
			attachedRequests: [],
			counteredRequests: [],
			showTab: 'offered', //default tab open
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

			currencyCode = '$'			

			return `${currencyCode}${total}`;
		}
	},

	methods: {
		async getTrip() {
			this.$store.dispatch('getMyTrip', this.$route.params.id)
				.then((trip) => {
					this.trip = trip;
					
					this.counteredRequests = this.trip.counteredRequests;
					console.log('this.trip', this.counteredRequests);
					this.attachedRequests = this.trip.attachedRequests;
					this.loading = false;

					if (this.attachedRequests.length >= 1) {
						this.showTab = 'attached';
						// HACK REMOVE THIS AFTER RECORDING
						this.requestForLocation = []
						return;
					}

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
			const attachedRequests = this.attachedRequests.filter((request) => request.id === requestId)[0]
			return (attachedRequests ? true : false)
		},

		// Is this request countered by traveller? return true or false;
		isThisCounteredToTrip(requestId) {
			const counteredRequests = this.counteredRequests.filter((request) => request.request.id === requestId)[0]
			return (counteredRequests ? true : false)
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
	},
}
</script>

<style lang="scss">

</style>