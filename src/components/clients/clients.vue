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
import phonesHeader from '@/components/clients/header';
import phonesItems from '@/components/clients/items';
import phonesFooter from '@/components/clients/footer';

export default {
  name: 'clients',
  data () {
    return {
      route: 'Clients'
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
