<template>
  <div class="my-trip" v-if="!loading">
    <div class="mw7 center">
			<h3>Your trip:</h3>
			<div class="ba pa3">

				<div class="ba pa3">
					<MyTrip :trip="trip"/>
				</div>

				<p>you're making <strong>{{totalProfitOfTrip}}</strong></p>


				<div class="tabs">
					<div class="tabs__header bt bl br flex">
						<button class="flex-grow-1"
							:class="showTab === 'attached' ? 'tab--active':''"
							@click="showTab = 'attached'">
							Accepted <span class="badge">{{attachedRequests.length}}</span>
						</button>
						<button class="flex-grow-1"
							:class="showTab === 'countered' ? 'tab--active':''"
							@click="showTab = 'countered'">
							Countered <span class="badge">{{counteredRequests.length}}</span>
						</button>
						<button class="flex-grow-1"
							:class="showTab === 'offered' ? 'tab--active':''"
							@click="showTab = 'offered'">
							All Offers <span class="badge">{{requestForLocation.length}}</span>
						</button>
					</div>

					<div class="tabs__content">
						<div class="bl bb br pa3" v-if="showTab === 'attached'">
							<h3 v-if="!attachedRequests.length">No accepted Requests:</h3>
							<h3 v-if="attachedRequests.length">Requests Accepted:</h3>

							<ul class="list pa0" v-if="attachedRequests.length">
								<li v-for="(request) in attachedRequests" :key="request.id" class="mb3">

									<TripRequest
										:request="request"
										context="attached"
										:tripId="trip.id"
										:status="'ACCEPTED'"
										:isThisAttachedToTrip="isThisAttachedToTrip(request.id)"
										:isThisCounteredToTrip="isThisCounteredToTrip(request.id)"
										@requestChanged="getTrip()"/>
								</li>
							</ul>
						</div>


						<div class="bl bb br pa3" v-if="showTab === 'countered'">
							<h3 v-if="!counteredRequests.length">No Countered Requests:</h3>
							<h3 v-if="counteredRequests.length">Requests You've countered:</h3>

							<ul class="list pa0" v-if="counteredRequests.length">
								<li v-for="(counteredRequest) in counteredRequests" :key="counteredRequest.id" class="mb3">
									<!-- <div class="ba pa3">
										<h3>name: {{counteredRequest.request.package.name}}</h3>
										<p>Cost of product: {{counteredRequest.request.offeredPrice.currencyCode}} {{counteredRequest.request.package.price.amount}}</p>
										<p>Bounty: {{counteredRequest.request.offeredPrice.currencyCode}} {{counteredRequest.request.offeredPrice.amount}}</p>
										<p>You've countered with: {{counteredRequest.price.currencyCode}} {{counteredRequest.price.amount}}</p>
										<p>Status of counter offer: {{counteredRequest.counterStatus}}</p>
									</div> -->
									<TripRequest
										:request="counteredRequest.request"
										context="countered"
										:tripId="trip.id"
										:status="counteredRequest.counterStatus"
										:isThisAttachedToTrip="isThisAttachedToTrip(counteredRequest.request.id)"
										:isThisCounteredToTrip="isThisCounteredToTrip(counteredRequest.request.id)"
										@requestChanged="getTrip()"/>
								</li>
							</ul>
						</div>


						<div class="bl bb br pa3" v-if="showTab === 'offered'">
							<h3 v-if="!requestForLocation.length">No Requests offered:</h3>
							<h3 v-if="requestForLocation.length">Requests offered:</h3>

							<ul class="list pa0" v-if="requestForLocation">
								<li v-for="(request) in requestForLocation" :key="request.id" class="mb3">
									<TripRequest
										:request="request"
										context="offered"
										:tripId="trip.id"
										:isThisAttachedToTrip="isThisAttachedToTrip(request.id)"
										:isThisCounteredToTrip="isThisCounteredToTrip(request.id)"
										@requestChanged="getTrip()"/>
								</li>
							</ul>
						</div>
					</div> <!--tabs__content-->

				</div>
			</div>
		</div>

		<!--
		<div v-else class="mw6 center">
			<h3>No Requests for your destination</h3>
			<p>Try adding stops on your trip! (idea)</p>
		</div> -->
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
			attachedRequests: [],
			counteredRequests: [],
			showTab: 'attached', //default tab open
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
					this.counteredRequests = this.trip.counteredRequests;
					this.attachedRequests = this.trip.attachedRequests;
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