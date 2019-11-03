<template>
  <div class="flex w-100 pb6">
		<div class="ba w-50 pa3">
			<h2>User 1: Requester</h2>

			<h3>My Requests</h3>

			<ul v-if="this.myRequests" class="list pa0 ma0 mb3">
				<li v-for="(request) in this.myRequests" :key="request.id" class="mb3">
					<router-link :to="{ name: 'my-request', params: { id: request.id }}" class="card-link ba pa3">
						<MyRequest :request="request"/>
					</router-link>
				</li>
			</ul>

			<div class="mb3">
				<button @click="() => isRequestFormVisible = !isRequestFormVisible">
					{{isRequestFormVisible ? "Close form" : "Create a request"}}
				</button>
			</div>

			<div v-if="isRequestFormVisible" class="my2 ba pa3 bg-near-white">
				<RequestForm @requestCreated="isRequestFormVisible = false"/>
			</div>
		</div>


		<div class="ba w-50 pa3">
			<h2>User 2: Traveller</h2>

			<h3>My Trips</h3>
			<ul v-if="this.myTrips" class="list pa0 ma0 mb3">
				<li v-for="(trip) in this.myTrips" :key="trip.id" class="mb3">
					<router-link :to="{ name: 'my-trip', params: { id: trip.id }}" class="card-link">
						<div class="ba pa3">
							<MyTrip :trip="trip"/>
						</div>
					</router-link>
				</li>
			</ul>

			<div class="mb3">
				<button @click="() => isTripFormVisible = !isTripFormVisible">
					{{isTripFormVisible ? "Close form" : "Create a trip"}}
				</button>
			</div>

			<div v-if="isTripFormVisible" class="my2 ba pa3 bg-near-white">
				<TripForm @tripCreated="isTripFormVisible = false"/>
			</div>

		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex';
import MyRequest from '@/components/MyRequest.vue'
import RequestForm from '@/components/RequestForm.vue'
import MyTrip from '@/components/MyTrip.vue'
import TripForm from '@/components/TripForm.vue'

export default {
	name: 'home',
	components: {
		MyRequest,
		RequestForm,
		MyTrip,
		TripForm,
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


