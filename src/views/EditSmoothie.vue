<template>
  <div v-if="smoothie" class="edit-smoothie container">
      <h2>Edit {{ smoothie.title }} smoothie </h2>
      <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <ul class="ingredients">
        <li v-for="(ing, index) in smoothie.ingredients" :key="index">
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
import db from '@/firebase/init'
export default {
  name: "EditSmoothie",
  data() {
      return {
          smoothie: null,
          feedback: null,
          another: null
      }
  },
  methods: {
    EditSmoothie(e) {
      if (this.smoothie.title) {
        this.feedback = null;
        db.collection("smoothies").doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
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
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "you must enter a value";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter((ingredirnt) => {
        return ingredirnt != ing;
      });
    },
  },
  created () {
      let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug );
      ref.get().then( snapshot =>{
          snapshot.forEach(doc => {
            this.smoothie = doc.data()
            this.smoothie.id = doc.id
          });
      })
  },
    computed: {
    slug() {
      return this.smoothie.title.split(" ").join("-");
    },
  },
};
</script>

<style lang="scss" >
.edit-smoothie {
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
