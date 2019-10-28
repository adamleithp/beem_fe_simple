<template>
  <span>{{placeString}}</span>
</template>

<script>
/* eslint-disable no-console */

export default {
	name: 'Place',

	props: ['placeId'],

	data() {
		return {
			id: this.placeId,
			placeString: ""
		}
	},

	mounted() {
		this.getLocationFromApi();
	},

	methods: {
		// Autocomplete Google Places api and fill in dropdown (by context)
		async getLocationFromApi() {
			fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.id}&fields=formatted_address&key=${process.env.VUE_APP_GOOGLE_API_KEY}`)
				.then((response) => {
					return response.json();
				})
				.then((json) => {
					// Save for payload POST createTrip
					this.placeString = json.result.formatted_address;
				});
		}
	}
}
</script>

<style lang="scss">

</style>
