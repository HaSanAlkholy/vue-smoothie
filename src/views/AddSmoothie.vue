<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <ul class="ingredients">
        <li v-for="(ing, index) in ingredients" :key="index">
          <span class="chip" @click="deleteIng(ing)">{{ ing }}</span>
        </li>
      </ul>
      <div class="field ingredient">
        <label for="add-ingredient">Add Ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="this.feedback">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
    };
  },
  methods: {
    addSmoothie(e) {
      if (this.title) {
        this.feedback = null;
        console.log(this.slug);
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          });
      } else {
        this.feedback = "add title";
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "you must enter a value";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter((ingredirnt) => {
        return ingredirnt != ing;
      });
    },
  },
  computed: {
    slug() {
      return this.title.split(" ").join("-");
    },
  },
};
</script>

<style lang="scss">
.add-smoothie {
  max-width: 500px;
  margin-top: 60px;
  padding: 20px;

  h2 {
    font-size: 30px;
    margin: 20px auto;
  }

  .field {
    margin: 20px auto;
  }

  .ingredients {
    margin: 30px auto;

    li {
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
