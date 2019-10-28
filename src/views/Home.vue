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
			<h2>User 1: Traveller</h2>
			<TripForm/>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex';
import RequestForm from '@/components/RequestForm.vue'
import TripForm from '@/components/TripForm.vue'

export default {
	name: 'home',
	components: {
		RequestForm,
		TripForm
	},
	data() {
		return {
			isRequestFormVisible: false
		}
	},
	computed: {
		...mapState({
			myRequests: state => state.myRequests,
		}),
	},
	mounted() {
		// Call async action
		this.$store.dispatch('getMyRequests')
	},
	methods: {
		async handleRequestCreate() {
			// Do validation...

			// Call async action
			this.$store.dispatch('createRequest', this.request)
		},
	}
}

</script>


<style lang="scss">


</style>


