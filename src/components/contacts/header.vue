<template>
	<header class="header d-flex justify-content-center align-items-center">
		<form v-show="name" class="search-form" id="search" style="display: block; position: absolute; top: -55px;">
			<input type="text" class="form-control" placeholder="Search by e-mail"
				v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
			<div>
				<svg class="search-form-svg">
					<use xlink:href="#maginifierTool"></use>
				</svg>
			</div>
		</form>

		<div class="search-results-header">
			<div class="search-results-item search-results-choose"></div>
			<div class="search-results-item search-results-transfer" style="left: 1px;">First name</div>
			<div class="search-results-item search-results-transfer" style="left: 0px;">Last name</div>
			<div class="search-results-item search-results-transfer" style="left: 0px;">Username</div>
			<div class="search-results-item search-results-sender" style="left: 25px;">E-mail</div>
			<div class="search-results-item search-results-result" style="left: 15px;">ID</div>
		</div>
	</header>
</template>

<script>
import appConfig from '../../main';

export default {
	name: 'users-header',
	data() {
	  return {
		searchQuery: '',
		searchType: 'email',
		name: true,
		phone: false
	  }
	},
	created() {
		appConfig.$on('clearHeader', () => {
			this.searchClear();
		});
	},
	methods: {
		changeView() {
			appConfig.$emit('searchQueryContacts', this.searchQuery, this.searchType);
		},
		searchClear() {
			this.searchQuery = '';
			appConfig.$emit('searchQueryContacts', this.searchQuery);
		}
	}
}
</script>
