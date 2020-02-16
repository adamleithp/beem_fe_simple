<template>
  <div class="w-100 pb6 pt5">

		<div class="mt5 ph2 mb4">
			<h1>Requests</h1>
			<p>
				Get anything delivered around the world.
			</p>
		</div>

		<ul v-if="this.myRequests" class="list pa0 ma0 mb3">
			<li v-for="(request) in this.myRequests" :key="request.id" class="mb3">
				<router-link :to="{ name: 'my-request', params: { id: request.id }}" class="card-link ba pa3">
					<MyRequest :request="request" context="list-view"/>
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
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex';
import MyRequest from '@/components/MyRequest.vue'
import RequestForm from '@/components/RequestForm.vue'

export default {
	name: 'MyRequestView',
	components: {
		MyRequest,
		RequestForm,
	},

	data() {
		return {
			request: {},
			isRequestFormVisible: false,
		}
	},

	computed: {
		...mapState({
			myRequests: state => state.myRequests,
		}),
	},
	mounted() {
		this.$store.dispatch('getMyRequests')
	},
}
</script>

<style lang="scss">

</style>