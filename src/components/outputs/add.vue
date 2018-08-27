<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<user-form-add></user-form-add>
				</section>
			</main>
		</div>
	</div>
</template>

<script>
import navbar from '@/components/common/navbar';
import userFormAdd from '@/components/outputs/form-add';
import appConfig from '../../main';

export default {
	name: 'output-add',
	components: {
		navbar:	navbar,
		userFormAdd: userFormAdd
	},
  created() {
    appConfig.getAccessToken();
    if (appConfig.access_token === 'login') {
      this.$router.push('login');
    }
  }
}
</script>
