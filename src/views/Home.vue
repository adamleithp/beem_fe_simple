<template>
  <div class="flex w-100 pb6">
		<div class="ba w-50 pa3">
			<h2>User 1: Requester</h2>

			<h3>My Requests</h3>

			<ul v-if="this.myRequests" class="list pa0 ma0 mb3">
				<li v-for="(request) in this.myRequests" :key="request.id">
					<div class="ba pa3">
						<h3>name: {{request.package.name}}</h3>
						<p>Status: {{request.status}}</p>
						<p>Bounty: {{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</p>
					</div>
				</li>
			</ul>

			<div class="mb3">
				<button @click="() => isRequestFormVisible = !isRequestFormVisible">Create a request</button>
			</div>

			<div v-if="isRequestFormVisible" class="my2 ba pa3 bg-near-white">
				<RequestForm />
			</div>
		</div>

		<div class="ba w-50 pa3">
			<h2>User 2: Traveller</h2>

			<h3>My Trips</h3>
			<ul v-if="this.myTrips" class="list pa0 ma0 mb3">
				<li v-for="(trip) in this.myTrips" :key="trip.id">
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
				</li>
			</ul>

			<div class="mb3">
				<button @click="() => isTripFormVisible = !isTripFormVisible">Create a trip</button>
			</div>

			<div v-if="isTripFormVisible" class="my2 ba pa3 bg-near-white">
				<TripForm/>
			</div>

		</div>
  </div>
</template>

<script>

/* eslint-disable no-console */
import { mapState } from 'vuex';
import RequestForm from '@/components/RequestForm.vue'
import TripForm from '@/components/TripForm.vue'
import Place from '@/components/Place.vue'

export default {
	name: 'home',
	components: {
		RequestForm,
		TripForm,
		Place
	},
	data() {
		return {
			isRequestFormVisible: false,
			isTripFormVisible: false
		}
	},
	computed: {
		...mapState({
			myRequests: state => state.myRequests,
			myTrips: state => state.myTrips,
		}),
	},
	mounted() {
		this.$store.dispatch('getMyRequests')
		this.$store.dispatch('getMyTrips')
	},
	methods: {
		async handleRequestCreate() {
			// Do validation...

			// Call async action
			this.$store.dispatch('createRequest', this.request)
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
	}
}

</script>


<style lang="scss">


</style>


