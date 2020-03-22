<template>
  <span>{{placeString}}</span>
</template>

<script>
/* eslint-disable no-console */

export default {
	name: 'Place',

	props: [
		'placeId',
	],

	data() {
		return {
			id: this.placeId,
			placeString: "Loading..."
		}
	},

	mounted() {
		this.getLocationFromApi();
	},

	methods: {
		// Autocomplete Google Places api and fill in dropdown (by context)
		async getLocationFromApi() {
			// Get lng/lat from place_id
			this.$store.dispatch('getLocationInformation', {
				locationId: this.id
			})
				.then((locationObject) => {
					this.placeString = locationObject.formattedAddress;
				})
		}
	}
}
</script>

<style lang="scss">

</style>
