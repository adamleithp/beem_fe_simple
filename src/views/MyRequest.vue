<template>
  <div v-if="!loading">
    <div class="mw7 center">
			<h3>Your Request:</h3>
			<div class="ba pa3">
				<MyRequest @requestChanged="getRequest" :request="request"/>
			</div>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import MyRequest from '@/components/MyRequest.vue'

export default {
	name: 'MyRequestView',
	components: {
		MyRequest,
	},

	data() {
		return {
			request: {},
			loading: true,
		}
	},

	methods: {
		async getRequest() {
			this.$store.dispatch('getMyRequest', this.$route.params.id)
				.then((request) => {
					console.log('request ->>> show delete options, ONLY IF status=pending');

					this.request = request;
					this.loading = false;
				})
				.catch(() => {
					this.$router.push({ name: 'home'})
				})
		},
	},

	mounted() {
		this.getRequest();
	},
}
</script>

<style lang="scss">

</style>