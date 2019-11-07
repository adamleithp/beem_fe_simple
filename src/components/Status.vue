<template>
  <span
		:class="statusClass"
		class="status">
		{{statusString}}
	</span>
</template>

<script>
/* eslint-disable no-console */
export default {
	name: 'Status',
	props: ['statusString'],
	computed: {
		statusClass() {
			if (this.statusString === 'ACCEPTED') return 'status--accepted';
			if (this.statusString === 'REJECTED') return 'status--rejected';
			if (this.statusString === 'PENDING') return 'status--pending';
			return ''
		}
	}
}
</script>

