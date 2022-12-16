const { ref, reactive, computed } = require("vue");

const person = reactive({
  name: "Suguri",
});
const title = computed(() => person.name + " the Best");
const titleLength = computed(() => title.value.length);
console.log(title.value);
console.log(titleLength.value);

person.name = "Juan";
console.log(title.value);
console.log(titleLength.value);
