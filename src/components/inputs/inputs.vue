<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<phones-header></phones-header>
					<phones-items></phones-items>
				</section>
				<phones-footer></phones-footer>
			</main>
		</div>
	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import phonesHeader from '@/components/inputs/header';
import phonesItems from '@/components/inputs/items';
import phonesFooter from '@/components/inputs/footer';

export default {
  name: 'inputs',
  data () {
    return {
      route: 'Inputs'
    }
  },
	created() {
		appConfig.getAccessToken();
		if (appConfig.access_token == 'login') {
			this.$router.push('login');
		}

		appConfig.route = this.route;
		appConfig.http = true;
	},
	components: {
		navbar,
		phonesHeader,
		phonesItems,
		phonesFooter
	}
}
</script>
