<template>
	<div class="flex">
		<div 
			class="medium-block box flex items-center"
			:class="isLink ? 'box--link' : 'box--light'"
		>
			<div>
				<div class="flex">
					<h5 class="ma0 mb2">{{request.package.name}}</h5> 
				</div>
				<h6 class="ma0 mt0">{{request.package.description}}</h6>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */

export default {
	name: 'MyRequest',
	props: [
		'request',
		'isLink'
	],
}
</script>
