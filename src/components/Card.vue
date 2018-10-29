<template functional>
    <v-touch tag="a" class="card" :href="props.eventUrl" target="_blank" :alt="props.cardTitle">
        <div class="card__dates">{{ props.cardDates }}</div>
        <div class="card__img" :style="{ backgroundImage: `url(${props.cardImg})` }"></div>
        <h3 class="card__title">{{ props.cardTitle }}</h3>
    </v-touch>
</template>

<style lang="scss" scoped>
    .card {
        min-width: 250px;
        max-width: 450px;
        width: 30%;
        border: 1px solid rgb(184, 184, 184);
        flex-grow: 1;
        display: block;
        text-decoration: none;
        color: inherit;

        &:not(:last-child) {
            margin-right: 20px;
        }

        &__dates {
            padding: 5px;
            position: absolute;
            background-color: rgba(255, 255, 255, .8)
        }

        &__img {
            width: 100%;
            height: 200px;
            background-size: cover;
        }

        &__title {
            padding: 20px 10px;
            margin: 0;
            word-break: break-word;
        }
    }
</style>

