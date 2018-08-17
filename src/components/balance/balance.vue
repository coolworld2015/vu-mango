<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<audits-header></audits-header>
					<audits-items></audits-items>
				</section>
				<audits-footer></audits-footer>
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import auditsHeader from '@/components/balance/header';
import auditsItems from '@/components/balance/items';
import auditsFooter from '@/components/balance/footer';

export default {
  name: 'balance',
  data () {
    return {
      route: 'Balance'
    }
  },
	created() {
		appConfig.getAccessToken();
		if (appConfig.access_token == 'login') {
			this.$router.push('login');
		}

		appConfig.route = this.route;
	},
	components: {
		navbar,
		auditsHeader,
		auditsItems,
		auditsFooter
	}
}
</script>
