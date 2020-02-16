<template>
  <div class="flex">
		<div class="medium-block box flex items-center">
			<div>
				<div class="flex">
					<h4 class="ma0 mb2">{{request.package.name}}</h4> 
				</div>
				<h6 class="ma0 mt0">
					<span class="text--increase">
						&#8963;<Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}
						Profit
					</span>
					<!-- Cost: <Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.package.price.amount}} -->
				</h6>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */
// import Status from '@/components/Status.vue'
import Currency from '@/components/Currency.vue'

export default {
	name: 'TripRequest',

	props: [
		'request',
	],

	components: {
		// Status,
		Currency,
	},
}
</script>

<style lang="scss">

</style>
