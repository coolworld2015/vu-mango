<template>
	<div v-if="status === 'loading'">
		<div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
			 <img src="../../assets/img/loading.gif">
		</div>
	</div>

	<div v-else-if="status === 'show'" class="search-results-content">

		<div class="payment selected1" v-for="item in items" v-on:click="showDetails(item)" >
			<div class="search-results-item search-results-choose"><span class="circle" style="background: #8bc34a;"></span></div>
      <div class="search-results-item search-results-sender">{{ item.to.email }}</div>
      <div class="search-results-item search-results-transfer">{{ ((+item.value).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") }}</div>

      <div class="search-results-item search-results-transfer" style="right: 35px;">{{ item.date.split('T')[0] }} {{ item.date.split('T')[1].split('.')[0]}}</div>
      <div class="search-results-item search-results-transfer">{{ item.to.first_name }}</div>
      <div class="search-results-item search-results-transfer">{{ item.to.last_name }}</div>
      <div class="search-results-item search-results-transfer">{{ item.to.username }}</div>



			<div class="search-results-item search-results-result long-term" style="right:65px;">
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
		status: 'show',
		clicked: false,
	  }
	},
	created() {
    this.fetchData();
	},
	methods: {
    fetchData() {
      this.status = 'loading';
      this.items = [];
      this.$http.get('http://94.130.206.254/api/Customers/transactions-list?access_token=' + appConfig.access_token)
        .then(result => {
          let customer = result.data.data.customer.email;
          console.log(result.data.data);
          let data = result.data.data.transactions.reverse();
          this.status = 'show';

          data.forEach((el) =>{
            if (el.to.email) {
              if (el.to.email.toLowerCase() !== customer) {
                this.items.push(el);
                console.log(this.items);
              }
            }
          });

          this.filteredItems = [].concat(this.items);
          this.status = 'show';
          appConfig.$emit('itemsCount', this.items.length);
          setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
        }).catch(()=> {
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
			this.$router.push('output-edit');
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
