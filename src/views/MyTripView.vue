<template>
  <div class="my-trip pb5" v-if="!loading">
		<div class="w-100 pt2 mb5">

			<div class="mt5 ph2 mb4 flex flex-row align-center">
				<router-link to="/trips" class="black f6 text--info">
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
				<div class="medium-block medium-block--stretch box"
				:class="totalProfitOfTrip > 0 ? 'box--accepted': 'box--light'">
					<p class="ma0 f4">Your Profit</p>
					<h1 class="ma0 mt2 lh-title flex items-center">
						<Currency :currencyCode="totalProfitOfTripCurrency"/><span class="mr2">{{totalProfitOfTrip}}</span>
						<span class="f6 mt2">with {{attachedRequests.length}} requests</span>
					</h1>
				</div>
			</div>
		</div>


		<div class="ph2">
			<h2>Relevant Requests</h2>
			<p>These are the requests pending, countered, or accepted needed from <Place :placeId="trip.fromLocation.googlePlaceId" class="text--bold"/> to <Place :placeId="trip.toLocation.googlePlaceId" class="text--bold"/></p>
		</div>

		<div class="flex mb2">	
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
						<h1 class="ma0">{{pendingRequestsForLocation.length}}</h1>
					</div>
				</div>
			</div>
		</div>


		<div class="ph2 mb5">
			<div class="" v-if="showTab === 'attached'">
				<p v-if="!attachedRequests.length" class="text--info">No accepted packages yet</p>
				<h3 v-if="attachedRequests.length">Accepted</h3>

				<ul class="list pa0" v-if="attachedRequests.length">
					<li v-for="(request) in attachedRequests" :key="request.id" class="mb3">
						<router-link 
							class="link"
							:to="{ 
								name: 'their-request-accepted', 
								params: { 
									tripId: trip.id,
									id: request.id,
								}
							}
						">
							<MyTripsRequest
								:request="request"
								:isLink="true"/>
						</router-link>

					</li>
				</ul>
			</div>


			<div class="" v-if="showTab === 'countered'">
				<p v-if="!counteredRequests.length" class="text--info">No negotations under way</p>
				<h3 v-if="counteredRequests.length">Countered</h3>

				<ul class="list pa0" v-if="counteredRequests.length">
					<li v-for="(counteredRequest) in counteredRequests" :key="counteredRequest.id" class="mb3">
						<router-link 
							class="link"
							:to="{ 
								name: 'their-request-countered', 
								params: { 
									tripId: trip.id,
									id: counteredRequest.request.id,
								}
							}
						">
							<MyTripsRequest
								:request="counteredRequest.request"
								:isLink="true"/>
						</router-link>
					</li>
				</ul>
			</div>


			<div class="" v-if="showTab === 'offered'">
				<p v-if="!pendingRequestsForLocation.length" class="text--info">No Pending requested to <Place :placeId="trip.toLocation.googlePlaceId"/></p>
				<h3 v-if="pendingRequestsForLocation.length">Offered</h3>

				<ul class="list pa0" v-if="pendingRequestsForLocation">
					<li v-for="(request) in pendingRequestsForLocation" :key="request.id" class="mb3">
						<router-link 
							class="link"
							:to="{ 
								name: 'their-request-pending', 
								params: { 
									tripId: trip.id,
									id: request.id,
								}
							}
						">
							<MyTripsRequest
								:request="request"
								:isLink="true"/>
						</router-link>

					</li>
				</ul>
			</div>
		</div>


		<div class="ph2 mb3">
			<h2>Manage my Trip</h2>
			<p>
				Delete, edit or set preferences. Note: once your trip has attached Requests, you need to request deletion of your trip.
			</p>
		</div>

		<button type="submit" class="small-block box mb4">
			Edit Request
		</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Currency from '@/components/Currency.vue'
import Place from '@/components/Place.vue'
import MyTrip from '@/components/MyTrip.vue'
import MyTripsRequest from '@/components/MyTripsRequest.vue'

export default {
	name: 'myTripView',
	components: {
		Place,
		Currency,
		MyTrip,
		MyTripsRequest,
	},

	data() {
		return {
			trip: {},
			pendingRequestsForLocation: [],
			attachedRequests: [],
			counteredRequests: [],
			showTab: 'offered', //default tab open
			loading: true,
			counteringOfferId: null,
		}
	},

	computed: {
		totalProfitOfTripCurrency() {
			// Get all prices
			const currencySymbols = this.trip.attachedRequests.map((request) => {
				// TODO: make sure this is the same for all attached...
				return request.offeredPrice.currencyCode;
			})
			// TODO: this will have different currencies
			return currencySymbols[0]
		},

		totalProfitOfTrip() {
			let total = Number(0);

			// Get all prices
			const prices = this.trip.attachedRequests.map((request) => {
				// TODO: make sure this is the same for all attached...
				return request.offeredPrice.amount;
			})

			// Add all prices together
			for (let i = 0; i < prices.length; i++) {
				const price = prices[i];
				total += parseInt(price);
			}

			return total;
		}
	},

	methods: {
		async getTrip() {
			this.$store.dispatch('getMyTrip', this.$route.params.id)
				.then((trip) => {
					this.trip = trip;					
					this.counteredRequests = this.trip.counteredRequests;
					this.attachedRequests = this.trip.attachedRequests;
					this.loading = false;

					// Get requests at trip destination location
					this.$store.dispatch('getRequestsForLocation', this.trip.toLocation.googlePlaceId)
						.then((requests) => {
							// Get PENDING requests
							const pendingRequests = requests.filter((request) => request.status === 'PENDING')
							this.pendingRequestsForLocation = pendingRequests;
						})
				})
				.catch(() => {
					this.$router.push({ name: 'home'})
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
		},
	},

	mounted() {
		this.getTrip();
	},
}
</script>

<style lang="scss">

</style>