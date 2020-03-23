<template>
	<div class="flex">
		<div 
			class="medium-block medium-block--stretch box items-center"
			:class="isLink ? '' : 'box--light'"
		>
			<div class="mb3">
				<div class="flex">
					<h3 class="ma0 mb2 text--capitalize">{{request.package.name}}</h3> 
				</div>
				<h6 class="ma0 mt0">{{request.package.description}}</h6>
			</div>

			<div class="flex">
				<div class="mr3 text--increase">
					<Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}
					Profit
				</div>
				<div>
					<Currency :currencyCode="request.package.price.currencyCode"/>{{request.package.price.amount}}
					Cost
				</div>
			</div>
		</div>
	</div>

  <!-- <div class="flex">
		<div class="medium-block box flex items-center">
			<div>
				<div class="flex">
					<h4 class="ma0 mb2">{{request.package.name}}</h4> 
				</div>
				<h6 class="ma0 mt0 flex">
					<h4 class="ma0 mt2 lh-title">
						&#8963;<Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}
						Profit
					</h4>
					<h4 class="ma0 text--increase">
						<Currency :currencyCode="request.package.price.currencyCode"/>{{request.package.price.amount}}
						Cost
					</h4>
				</h6>
			</div>
		</div>
	</div> -->
</template>

<script>
/* eslint-disable no-console */
// import Status from '@/components/Status.vue'
import Currency from '@/components/Currency.vue'

export default {
	name: 'MyTripsRequest',

	props: [
		'request',
		'isLink'
	],

	components: {
		// Status,
		Currency,
	},
}
</script>

<style lang="scss">

</style>
