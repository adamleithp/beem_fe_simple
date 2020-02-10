<template>
  <span>{{currencySymbol}}</span>
</template>

<script>
/* eslint-disable no-console */

export default {
	name: 'Currency',

	props: ['currencyCode'],

	computed: {
		currencySymbol() {
			if (this.currencyCode === 'USD') {
				return '$'
			} 
			return '$'
		}
	}
}
</script>

<style lang="scss">

</style>
