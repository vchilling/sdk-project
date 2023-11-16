<template>
    <button @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    inheritAttrs: false,
    methods: {
        handleClick() {
            this.$emit('click');
        },
    },
};
</script>

<style scoped>
button {
    display: inline-block;
    margin: 25px;
    padding: 10px 20px;
    background-color: #c5dde3;
    color: #000;
    text-decoration: none;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
    background-color: #d8efda;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(0);
    transform-origin: 100% 0;
    transition: transform 0.3s;
    z-index: -1;
}

button:hover::before {
    transform: scale(1);
}
</style>