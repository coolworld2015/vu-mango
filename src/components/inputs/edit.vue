<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results" style="overflow:auto;">
					<phone-form-edit></phone-form-edit>
				</section>
			</main>
		</div>
	</div>
</template>

<script>
import navbar from '@/components/common/navbar';
import phoneFormEdit from '@/components/inputs/form-edit';

export default {
	name: 'input-edit',
	components: {
		navbar:	navbar,
		phoneFormEdit: phoneFormEdit
	}
}
</script>
