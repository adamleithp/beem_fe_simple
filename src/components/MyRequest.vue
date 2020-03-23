<template>
	<div class="flex">
		<div 
			class="medium-block medium-block--stretch box items-center"
			:class="isLink ? 'box--link' : 'box--light'"
		>
			<div class="mb3">
				<div class="flex">
					<h3 class="ma0 mb2 text--capitalize">{{request.package.name}}</h3> 
				</div>
				<h6 class="ma0 mt0">{{request.package.description}}</h6>
			</div>

			<div class="flex justify-between">

				<div class="flex">
					<div class="mr3 text--increase">
						<Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}
						Offered
					</div>
					<div>
						<Currency :currencyCode="request.package.price.currencyCode"/>{{request.package.price.amount}}
						Cost
					</div>
				</div>

				<div v-if="request.status === 'ACCEPTED'" class="text--positive">
					Accepted
				</div>
				<div v-if="request.status === 'COUNTERED'" class="text--negative">
					Countered
				</div>
				<div v-if="request.status === 'PENDING'" class="text--neutral">
					Pending
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */
import Currency from '@/components/Currency.vue'

export default {
	name: 'MyRequest',

	components: {
		Currency,
	},

	props: [
		'request',
		'isLink'
	],
}
</script>
