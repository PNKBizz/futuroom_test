<template>
  <v-touch 
    class="test" 
    @swiperight="getEvents({ page: currentPage - 1 })"
    @swipeleft="getEvents({ page: currentPage + 1})"
  >
    <card 
      v-for="event in currentEvents(currentPage)" 
      :key="event.id"
      :card-img="event.thumbnail.url"
      :card-title="event.title"
      :card-dates="event.dates"
      :event-url="`https://vmeste-region.ru/votes/${event.id}`"
    />
  </v-touch>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Card from './Card'

export default {
  name: 'Test',
  components: { Card },
  computed: {
    ...mapState(['currentPage']),
    ...mapGetters(['currentEvents'])
  },
  methods: {
    ...mapActions(['getEvents'])
  },
  mounted() {
    this.getEvents()
  }
}
</script>

<style scoped lang="scss">
  .test {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
  }
</style>
