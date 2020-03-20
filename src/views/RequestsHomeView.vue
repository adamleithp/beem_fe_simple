<template>
  <div class="w-100 pb6 pt5">

		<div class="mt5 ph2 mb4">
			<h1>Requests</h1>
			<p>
				Get anything delivered around the world, <br> 
				or right around the corner
			</p>
		</div>


		<div class="ph2 mb4">
			<h2>My Requests</h2>
			<p>
				These are your personal requests.
			</p>
		</div>

		<ul v-if="this.myRequests" class="list ph2 ma0 mb3">
			<li v-for="(request) in this.myRequests" :key="request.id" class="mb3">
				<router-link :to="{ name: 'my-request', params: { id: request.id }}" class="link">
					<MyRequest :request="request" isLink="true"/>
				</router-link>
			</li>
		</ul>

		<div class="mb3 ph2">
			<button class="small-block box" @click="() => isRequestFormVisible = !isRequestFormVisible">
				{{isRequestFormVisible ? "Close form" : "Create"}}
			</button>
		</div>

		<div class="modal modal--bottom" v-if="isRequestFormVisible">
			<div class="modal-overlay" @click="() => isRequestFormVisible = !isRequestFormVisible"></div>
			<div class="modal-content my2 pa3 bg-near-white h100">
				<div class="app-width center">
					<RequestForm @requestCreated="isRequestFormVisible = false"/>
				</div>
			</div>
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