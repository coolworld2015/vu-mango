<template>
	<div v-if="status === 'loading'">
		<div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
			 <img src="../../assets/img/loading.gif">
		</div>
	</div>

	<div v-else-if="status === 'show'" class="search-results-content">

		<div class="payment selected1" v-for="item in items" v-on:click="showDetails(item)" >
			<div class="search-results-item search-results-choose"><span class="circle" style="background: #8bc34a;"></span></div>
      <div class="search-results-item search-results-transfer">{{ item.first_name }}</div>
      <div class="search-results-item search-results-transfer" >{{ item.last_name }}</div>
      <div class="search-results-item search-results-transfer">{{ item.username }}</div>
      <div class="search-results-item search-results-sender">{{ item.email }}</div>


			<div class="search-results-item search-results-result long-term">
				<span class="search-results-icon"></span>
				{{ item.id }}
			</div>

		</div>

	</div>

	<div v-else-if="status === 'error'">
 		<div style="position: relative; top: 200px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; color: red; font-weight: bold; font-size:24px">
             Something went wrong
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import appConfig from '../../main';

export default {
	name: 'phones-items',
	data() {
	  return {
		items: [],
		filteredItems: [],
		recordsCount: 20,
		positionY: 0,
		status: 'show'
	  }
	},
	created() {
    this.fetchData();
		this.items = appConfig.contacts.items.sort(this.sort).slice(0, 20);
		this.filteredItems = appConfig.contacts.items.sort(this.sort);

		setTimeout(()=> {
			if (document.querySelector('.search-results-content')) {
				document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)
			}
		}, 100);

		if (appConfig.contacts.refresh) {
            appConfig.contacts.refresh = false;
			this.fetchData();
		}

		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		};
		appConfig.$on('clearHeader', () => {
			this.status = 'show';
			setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
		});
		appConfig.$on('searchQueryContacts', (searchQuery, searchType) => {
			this.searchQuery = searchQuery;
			let arr = [].concat(this.filteredItems);
			let items;

      items = arr.filter((el) => el.email.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);

			this.filteredItems = items;
			this.items = items.slice(0, 20);
			this.positionY = 0;
			this.recordsCount = 20;

			appConfig.$emit('itemsCount', items.length);
			if (searchQuery === '') {
				this.items = appConfig.contacts.items.slice(0, 20);
				this.filteredItems = appConfig.contacts.items;
        appConfig.$emit('itemsCount', this.filteredItems.length);
			}
		});
	},
	methods: {
		fetchData() {
			this.status = 'loading';
			this.$http.get(appConfig.URL + 'Customers?access_token=' + appConfig.access_token)
				.then(result => {
					appConfig.contacts.items = result.data.sort(this.sort);
					this.items = result.data.sort(this.sort).slice(0, 20);
					this.filteredItems = result.data.sort(this.sort);
          appConfig.$emit('itemsCount', result.data.length);
          this.status = 'show';

					setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.status = 'show';
					this.$router.push('/login');
				})
		},
		handleScroll() {
			let position = document.querySelector('.search-results-content').scrollTop;
			let items, positionY, recordsCount;
			recordsCount = this.recordsCount;
			positionY = this.positionY;
			items = this.filteredItems.slice(0, recordsCount);

			if (position > positionY) {
				this.items = items;
				this.recordsCount = recordsCount + 10;
				this.positionY = positionY + 400;
			}
		},
		showDetails(item){
			appConfig.item = item;
			this.$router.push('contact-edit');
		},
		sort(a, b) {
			let nameA = a.username.toLowerCase(), nameB = b.username.toLowerCase();
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}
			return 0;
		}
	}
}
</script>
